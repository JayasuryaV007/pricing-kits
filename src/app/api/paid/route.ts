import { NextRequest, NextResponse } from 'next/server';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import moment from 'moment';
interface DataType {
  id: string;
  user_id: string;
  service_name: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  start_date: string;
  paid_date: string;
  service_url: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

export async function PUT(request: NextRequest) {
  const { id }: DataType = await request.json();

  const client = getSupabaseServerComponentClient();

  // Fetch the subscription details
  const { data, error } = await client
    .from('user_subscriptions')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();
  // .maybeSingle();

  console.log('DATATATATTT');
  console.log(data);
  if (!data || error) {
    return NextResponse.json(
      {
        message: 'Subscription not found or error occurred',
        error: error?.message,
      },
      { status: 500 },
    );
  }

  const billingCycle = data.billing_cycle;
  const startDate = moment(new Date()).format('DD-MM-YYYY');

  if (!startDate) {
    return NextResponse.json(
      { message: 'Start date is invalid' },
      { status: 400 },
    );
  }

  // let paidDate: string | null = null;
  let nextBillingDate: string | null = null;

  switch (billingCycle) {
    case 'Monthly':
      // paidDate = startDate.clone().add(1, 'month').format('DD-MM-YYYY');
      nextBillingDate = moment(startDate, 'DD-MM-YYYY')
        .add(1, 'month')
        .format('DD-MM-YYYY');
      break;
    case 'Quarterly':
      // paidDate = startDate.clone().add(3, 'months').format('DD-MM-YYYY');
      nextBillingDate = moment(startDate, 'DD-MM-YYYY')
        .add(3, 'months')
        .format('DD-MM-YYYY');
      break;
    case 'Half-yearly':
      // paidDate = startDate.clone().add(6, 'months').format('DD-MM-YYYY');
      nextBillingDate = moment(startDate, 'DD-MM-YYYY')
        .add(6, 'months')
        .format('DD-MM-YYYY');
      break;
    case 'Yearly':
      // paidDate = startDate.clone().add(1, 'year').format('DD-MM-YYYY');
      nextBillingDate = moment(startDate, 'DD-MM-YYYY')
        .add(1, 'year')
        .format('DD-MM-YYYY');
      break;
    default:
      return NextResponse.json(
        { message: 'Unknown billing cycle' },
        { status: 400 },
      );
  }

  if (!nextBillingDate) {
    return NextResponse.json(
      { message: 'Failed to calculate next billing date or paid date' },
      { status: 400 },
    );
  }

  const insertedData = {
    user_id: data.user_id,
    service_name: data.service_name,
    plan_name: data.plan_name,
    price: data.price,
    billing_cycle: data.billing_cycle,
    next_billing_date: nextBillingDate,
    start_date: startDate,
    paid_date: startDate,
    service_url: data.service_url,
    status: data.status,
    type: data.type,
  };

  console.log('insertedData', insertedData);

  const { error: historyError } = await client
    .from('user_subscriptions')
    .upsert(insertedData);

  if (historyError) {
    return NextResponse.json(
      {
        message: 'Failed to save old subscription data',
        error: historyError.message,
      },
      { status: 500 },
    );
  } else {
    return NextResponse.json(
      {
        message: 'Status updated successfully',
        paid_date: startDate,
        next_billing_date: nextBillingDate,
      },
      { status: 200 },
    );
  }

  // Update the subscription with the calculated next billing date and paid date
  // const { error:errorExcp } = await client
  //   .from('user_subscriptions')
  //   .update({ paid_date: paidDate, next_billing_date: nextBillingDate })
  //   .eq('id', id);

  // if (errorExcp) {
  //   return NextResponse.json(
  //     { message: 'Failed to update subscription status', error: errorExcp.message },
  //     { status: 500 }
  //   );
  // } else {
  //   return NextResponse.json(
  //     { message: 'Status updated successfully', paid_date: paidDate, next_billing_date: nextBillingDate },
  //     { status: 200 }
  //   );
  // }
}
