import { NextRequest, NextResponse } from 'next/server';
import Product from '~/models/Products';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    const products = await Product.findOne({
      _id: id,
    });

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
