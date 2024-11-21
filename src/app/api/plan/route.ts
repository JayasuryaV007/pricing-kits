import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/mongodb/client';
import Plans from '~/models/Plans';
import Subscriptions from '~/models/Subscriptions';

export async function POST(request: NextRequest) {
  try {
    let body = (await request.json()) as any;
    await connectDB();

    const plans = await Plans.find();
    const result = plans.filter((obj) => obj.name === body.name);

    const periodStartsAt = new Date();
    const periodEndsAt = new Date(periodStartsAt);

    if (body.name === 'Free Trail') {
      periodEndsAt.setDate(periodStartsAt.getDate() + 6);
    } else {
      periodEndsAt.setDate(periodStartsAt.getDate() + 29);
    }

    const subscriptionData = {
      ...body,
      plan_id: result[0]?.id,
      period_starts_at: periodStartsAt,
      period_ends_at: periodEndsAt,
    };

    const existingSubscription = await Subscriptions.findOne({
      user_id: body.user_id,
    });
    let subscription;

    if (existingSubscription) {
      subscription = await Subscriptions.findByIdAndUpdate(
        existingSubscription._id,
        subscriptionData,
        { new: true },
      );
    } else {
      subscription = await Subscriptions.create(subscriptionData);
    }

    return NextResponse.json({ data: subscription }, { status: 200 });
  } catch (error) {
    console.error('subscription create/update error:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to create/update subscription' },
      { status: 500 },
    );
  }
}
