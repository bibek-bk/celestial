
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


export async function updateUser(userId: string, input: UpdateUserInput): Promise<User> {
    const { data, error } = await supabase
        .from('profiles')
        .update(input)
        .eq('id', userId)
        .select()
        .single()
    if (error) throw error;
    return data as User;
}