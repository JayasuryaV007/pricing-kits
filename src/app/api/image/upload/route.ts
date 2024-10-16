import { NextRequest, NextResponse } from 'next/server';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import { inngest } from '~/inngest/client';
import { getSignedInUserId } from '~/lib/server/queries';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const client = getSupabaseServerComponentClient();
    const user_id = await getSignedInUserId();

    const { screenshot } = (await request.json()) as any;

    if (!screenshot) {
      return NextResponse.json(
        {
          error: 'No screenshot provided',
        },
        { status: 400 },
      );
    }

    const base64Data = screenshot.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const fileName = `${Date.now()}.png`;

    const { data, error } = await client.storage
      .from('screenshots')
      .upload(fileName, buffer, {
        contentType: 'image/png',
      });

    if (error) {
      console.log('Error in upload screenshot: ', error);
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    }

    const imageData = {
      user_id: user_id,
      image_name: fileName,
      status: 'waiting',
      status_extra: {},
    };
    console.log('data', imageData);

    const { data: image_response, error: error1 } = await client
      .from('image_details')
      .upsert(imageData)
      .select();

    if (error) {
      console.log('Error in store image details: ', error1);
    }

    console.log('success', image_response);
    if (image_response && image_response.length > 0) {
      await client
        .from('image_details')
        .update({ status: 'initializing' })
        .eq('id', image_response[0].id);

      await inngest.send({
        name: 'convert-image-to-text',
        data: image_response[0],
      });
      return NextResponse.json(
        {
          data: image_response[0].id,
        },
        { status: 200 },
      );
    }
  } catch (error: any) {
    console.log('Error in upload screenshot: ', error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
