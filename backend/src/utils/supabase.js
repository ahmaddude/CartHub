import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadToSupabase = async (base64Image, bucket, fileName) => {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw new Error(`Supabase upload error: ${error.message}`);

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

export default supabase;
