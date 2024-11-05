import { NextRequest, NextResponse } from 'next/server';
import TooltipContent from '~/models/Tooltip';

export async function GET(req: NextRequest) {
  try {
    const user_id = req.nextUrl.searchParams.get('user_id');
    if (!user_id) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 401 });
    }

    const product_id = req.nextUrl.searchParams.get('project_id');

    if (!product_id) {
      return NextResponse.json(
        { message: 'Product Not Found' },
        { status: 400 },
      );
    }

    const tooltips = await TooltipContent.find({
      project_id: product_id,
    }).sort({ created_at: -1 });

    return NextResponse.json(
      {
        data: tooltips,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error: any) {
    console.error('tooltip error:', error);
    return NextResponse.json(
      { message: 'Error fetching tooltip: ' + error.message },
      { status: 500 },
    );
  }
}
