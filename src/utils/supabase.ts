import { supabase } from "@/libs";

const DUPLICATED_RESOURCE = "409";
const KNOWN_STATUS_ERRORS = [DUPLICATED_RESOURCE];

export async function uploadImage(file: File) {
  const { data, error } = await supabase.storage
    .from('kribi-news-images')
    .upload(
      `public/${file.name}`,
      file,
      {
        contentType: 'image/jpeg'
      }
    );

  if (error?.statusCode && !KNOWN_STATUS_ERRORS.includes(error.statusCode)) {
    throw error;
  }

  return getImageUrl(`public/${file.name}`);
}

export async function getImageUrl(fileName: string) {
  const { data } = supabase.storage
    .from('kribi-news-images')
    .getPublicUrl(fileName);

  return data;
}