import { NextRequest, NextResponse } from 'next/server';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

export async function PUT(request: NextRequest) {
  try {
    const payload = await request.json();
    const client = getSupabaseServerComponentClient();
    let { data, error } = await client
      .from('app_configs')
      .update(payload)
      .eq('id', payload.id);

    if (error) {
      console.error('Error updating app configurations:', error);
      return NextResponse.json(
        {
          message: 'Failed to update app configurations',
          error: error.message,
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        message: 'App configurations updated successfully',
        data: payload,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 },
    );
  }
}
