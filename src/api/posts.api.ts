import { supabase } from '@/lib/supabaseClient';

export interface CreatePostPayload {
  user_id: string;
  caption: string;
  image_url: string;
}

export interface DbPostRow {
  id: string;
  user_id: string;
  caption: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  like_count:number;
  profiles?: {  // Add this
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

export const postsApi = {


  async uploadImage(file: File, userId: string): Promise<string> {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    //better to do validation on both client and storage RLS
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only images are allowed.');
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Removed the 'posts/' prefix - just use fileName directly

    const { data, error } = await supabase.storage
      .from('post-images')
      .upload(fileName, file, {  // ← Changed from filePath to fileName
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  },
  async createPost(payload: CreatePostPayload): Promise<DbPostRow> {
    const { data, error } = await supabase
      .from('posts')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data as DbPostRow;
  },

  async deleteImage(imageUrl: string): Promise<void> {
    const path = imageUrl.split('/post-images/')[1];
    if (path) {
      const { error } = await supabase.storage.from('post-images').remove([path]);
      if (error) throw error;
    }
  },
  async getAllPosts(): Promise<DbPostRow[]> {
    console.log('from getAllPosts');

    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          id,
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });
    console.log(data)
    if (error) throw error;
    return data as DbPostRow[];
  },
};


