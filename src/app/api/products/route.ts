import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/mongodb/client';
import { Products } from '~/types/products';
import Product from '~/models/Products';
import Quota from '~/models/Quota';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Products;
    await connectDB();

    if (!body.user_id) {
      return NextResponse.json({ error: 'User not Found' }, { status: 401 });
    }

    const product = await Product.create(body);
    await Quota.findOneAndUpdate(
      { user_id: body.user_id },
      { $inc: { page_count: 1 } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (error) {
    console.error('product create error:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to create product' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as Products;
    await connectDB();

    if (!body.user_id) {
      return NextResponse.json({ error: 'User not Found' }, { status: 401 });
    }

    const product = await Product.updateOne(body, { _id: body._id });

    return NextResponse.json({ data: body }, { status: 200 });
  } catch (error) {
    console.error('product update error:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to update product' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const user_id = req.nextUrl.searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 400 });
    }

    const products = await Product.find({
      user_id: user_id,
    }).sort({ created_at: -1 });

    return NextResponse.json(
      {
        data: products,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error: any) {
    console.error('product error:', error);
    return NextResponse.json(
      { message: 'Error fetching product: ' + error.message },
      { status: 500 },
    );
  }
}
