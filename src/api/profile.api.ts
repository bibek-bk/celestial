
import { supabase } from "@/lib/supabaseClient";
import type { User, UpdateUserInput } from "@/entities/user/types";


export async function fetchProfile(userId: string): Promise<User | null> {

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    if (error) throw error;

    return data;
}



export async function updateUser(input: UpdateUserInput): Promise<User> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
        .from('profiles')
        .update(input)
        .eq('id', user.id)
        .select()
        .single();

    if (error) throw error;
    if (!data) throw new Error('Profile update failed');

    return data as User;
}

export async function uploadAvatar(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {  // ← Changed from filePath to fileName
            cacheControl: '3600',
            upsert: false,
        });

    if (error) throw error;

    const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}