import { NextRequest, NextResponse } from 'next/server';
import { loadUserSubscriptions } from '~/lib/server/loaders/load-user-subscriptions';
import { getSignedInUserId } from '~/lib/server/queries';
import { ConvertToUSD } from '~/lib/subscriptions/convert-to-usd';

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const userId = await getSignedInUserId();
    let response;
    if (userId) {
      const result = await loadUserSubscriptions();
      response = result
        .slice(0, 5)
        .map((obj) => ({
          ...obj,
          price: `$${ConvertToUSD(obj.price).toFixed(2)}`,
        }))
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
    }
    return NextResponse.json(
      {
        data: response,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log('Error in upload screenshot: ', error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
