import { NextRequest, NextResponse } from 'next/server';
import Subscriptions from '~/models/Subscriptions';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const user_id = req.nextUrl.searchParams.get('user_id');

    const subscription = await Subscriptions.aggregate([
      {
        $match: {
          user_id: new ObjectId(user_id || ''),
        },
      },
      {
        $lookup: {
          from: 'plans',
          localField: 'price_id',
          foreignField: 'price_id',
          as: 'plans',
        },
      },
    ]);

    return NextResponse.json(
      {
        data: subscription,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.error(' error:', error);
    return NextResponse.json(
      { message: 'Error : ' + error.message },
      { status: 500 },
    );
  }
}
