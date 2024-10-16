import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

async function getSVGContent(filePath: string) {
  const client = getSupabaseServerComponentClient();

  const { data }: { data: any } = await client.storage
    .from('images')
    .createSignedUrl(filePath, 60 * 10);

  if (!data?.signedUrl) {
    console.log('Error getting public URL');
    throw new Error('Error getting public URL');
  }

  console.log('data: ', data);
  try {
    const response = await fetch(data.signedUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const svgContent = await response.text();
    return svgContent;
  } catch (error) {
    console.log('Error fetching SVG file:', error);
    throw error;
  }
}

export default getSVGContent;
