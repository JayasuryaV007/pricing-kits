import type { Stripe } from 'stripe';
import type { SupabaseClient } from '@supabase/supabase-js';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import getStripeInstance from '~/core/stripe/get-stripe';
import StripeWebhooks from '~/core/stripe/stripe-webhooks.enum';
import getLogger from '~/core/logger';

import {
  throwBadRequestException,
  throwInternalServerErrorException,
} from '~/core/http-exceptions';

import {
  addSubscription,
  deleteSubscription,
  updateSubscriptionById,
} from '~/lib/subscriptions/mutations';

import getSupabaseRouteHandlerClient from '~/core/supabase/route-handler-client';
import Subscriptions from '~/models/Subscriptions';

const STRIPE_SIGNATURE_HEADER = 'stripe-signature';

const webhookSecretKey = process.env.STRIPE_WEBHOOK_SECRET as string;

/**
 * @description Handle the webhooks from Stripe related to checkouts
 */
export async function POST(request: Request) {
  // const logger = getLogger();
  const signature = headers().get(STRIPE_SIGNATURE_HEADER)!;

  // logger.info(`[Stripe] Received Stripe Webhook`);

  // if (!webhookSecretKey) {
  //   return throwInternalServerErrorException(
  //     `The variable STRIPE_WEBHOOK_SECRET is unset. Please add the STRIPE_WEBHOOK_SECRET environment variable`,
  //   );
  // }

  // verify signature header is not missing
  // if (!signature) {
  //   return throwBadRequestException();
  // }

  const rawBody = await request.text();
  const stripe = await getStripeInstance();

  // create an Admin client to write to the subscriptions table
  // const client = getSupabaseRouteHandlerClient({
  //   admin: true,
  // });

  try {
    // build the event from the raw body and signature using Stripe
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecretKey,
    );

    console.log('event.type', event.type);
    switch (event.type) {
      case StripeWebhooks.Completed: {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;

        console.log('sessions------', session.metadata);
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error('No userId found in session metadata');
          throw new Error('No userId found in session metadata');
        }

        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        console.log('Subscription-------', subscription);

        // await onCheckoutCompleted(client, session, subscription);
        await Subscriptions.create({
          subscription_id: subscription.id,
          user_id: userId,
          price_id: subscription.items.data[0].price.id,
          stripe_customer_id: session.customer as string,
          status: subscription.status as
            | 'trialing'
            | 'active'
            | 'past_due'
            | 'canceled'
            | 'incomplete'
            | 'incomplete_expired',
          period_starts_at: new Date(
            subscription.current_period_start * 1000,
          ).toISOString(),
          period_ends_at: new Date(
            subscription.current_period_end * 1000,
          ).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        });
        break;
      }

      case StripeWebhooks.SubscriptionDeleted: {
        const subscription = event.data.object as Stripe.Subscription;

        // await deleteSubscription(client, subscription.id);

        break;
      }

      case StripeWebhooks.SubscriptionUpdated: {
        const subscription = event.data.object as Stripe.Subscription;

        // await updateSubscriptionById(client, subscription);

        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);

    // return throwInternalServerErrorException();
    return new NextResponse('Webhook Error' + error.message, { status: 500 });
  }
}

/**
 * @description When the checkout is completed, we store the order. The
 * subscription is only activated if the order was paid successfully.
 * Otherwise, we have to wait for a further webhook
 */

export const config = {
  api: {
    bodyParser: false,
  },
};
