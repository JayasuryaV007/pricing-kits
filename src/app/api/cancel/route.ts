import { NextRequest, NextResponse } from 'next/server';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

interface ConfigUpdates {
    id: number; // The ID of the record to update
}
export async function PUT(request: NextRequest) {
    const {id}: ConfigUpdates = await request.json();
    // Update the subscription status in the database
    const { data, error } = await getSupabaseServerComponentClient()
      .from('user_subscriptions')
      .update({ status: 'Cancelled' })
      .eq('id',id);
    if (error) {
        return NextResponse.json(
            { message: 'Failed to update subscription status', error: error.message },
            { status: 500 }
        );
    }else{
        return NextResponse.json(
            { message: 'Status updated successfully'},
            { status: 200 }
        );
    }
  }
  