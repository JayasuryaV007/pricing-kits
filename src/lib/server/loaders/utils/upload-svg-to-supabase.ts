import getSupabaseBrowserClient from '~/core/supabase/browser-client';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

async function uploadSvgToSupabase(svgContent: string, fileName: string) {
  const client = getSupabaseServerComponentClient();
  const { data, error }: { data: any; error: any } = await client.storage
    .from('images')
    .upload(fileName, Buffer.from(svgContent), {
      contentType: 'image/svg+xml',
    });
  if (error) {
    throw new Error(`Failed to upload SVG: ${error.message}`);
  }

  console.log('upload data', data);

  return data;
}

export default uploadSvgToSupabase;
