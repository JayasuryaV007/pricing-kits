import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import connectDB from '~/lib/mongodb/client';
import TooltipContent from '~/models/Tooltip';
import { NextRequest, NextResponse } from 'next/server';
import { ElementData } from '~/app/create-enhance/components/Stepper';

const s3Client = new S3({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: process.env.DO_SPACES_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.DO_SPACES_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const user_id = formData.get('user_id') as string;
    const project_id = formData.get('project_id') as string;
    const url = formData.get('url') as string;
    const textstring = formData.get('text') as any;
    const text = JSON.parse(textstring);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const article_url = formData.get('article_url') as string;
    const mediaFile = formData.get('media') as any | null;

    let mediaUrl = '';
    let mediaType = '';
    if (mediaFile) {
      const buffer = await mediaFile.arrayBuffer();
      const fileStream = Buffer.from(buffer);

      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.DO_SPACES_NAME,
          Key: `tooltips/${Date.now()}-${mediaFile.name}`,
          Body: fileStream,
          ACL: 'public-read',
          ContentType: mediaFile.type,
        },
      });

      const result = await upload.done();
      console.log('result', result);
      mediaUrl = result.Location!;
      mediaType = mediaFile.type;
    }

    const tooltipContent = await TooltipContent.create({
      user_id,
      project_id,
      url,
      text: JSON.stringify(text),
      title,
      description,
      image_url: mediaType.startsWith('image/') ? mediaUrl : '',
      video_url: mediaType.startsWith('video/') ? mediaUrl : '',
      article_url,
    });

    return NextResponse.json(
      {
        data: tooltipContent,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error adding tooltip:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add Tooltip' },
      { status: 500 },
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
