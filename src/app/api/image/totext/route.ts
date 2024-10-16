import { NextRequest, NextResponse } from 'next/server';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const client = getSupabaseServerComponentClient();

    return NextResponse.json(
      {
        data: 'success',
      },
      { status: 200 },
    );
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
