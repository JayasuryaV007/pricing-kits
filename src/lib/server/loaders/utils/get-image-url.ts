import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

async function getImageUrl(filePath: string) {
  const client = getSupabaseServerComponentClient();
  const { data }: { data: any } = await client.storage
    .from('screenshots')
    .createSignedUrl(filePath, 60 * 60);
  console.log('data: ', data);
  return data.signedUrl;
}

export default getImageUrl;
