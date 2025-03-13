import React, { useMemo } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { getI18n } from 'react-i18next';

import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import PricingTable from '~/components/PricingTable';
import SubscriptionStatusAlert from './SubscriptionStatusAlert';
import SubscriptionStatusBadge from '~/app/(site)/pricing/components/SubscriptionStatusBadge';

import configuration from '~/configuration';

const SubscriptionCard: React.FC<{
  subscription: any;
}> = ({ subscription }) => {
  // const details = useSubscriptionDetails(subscription.priceId);
  // const cancelAtPeriodEnd = subscription.cancelAtPeriodEnd;
  // const isActive = subscription.status === 'active';
  // const language = getI18n().language;

  // const dates = useMemo(() => {
  //   const endDate = new Date(subscription.periodEndsAt);
  //   const trialEndDate =
  //     subscription.trialEndsAt && new Date(subscription.trialEndsAt);

  //   return {
  //     endDate: endDate.toLocaleDateString(language),
  //     trialEndDate: trialEndDate
  //       ? trialEndDate.toLocaleDateString(language)
  //       : null,
  //   };
  // }, [language, subscription]);

  const plan = subscription.plans[0];
  const isActive =
    subscription.status === 'active' || subscription.status === 'trialing';
  const endDate = new Date(subscription.current_period_ends_at);

  // if (!details) {
  //   return null;
  // }

  return (
    <div
      className={'space-x-0'}
      data-cy={'subscription-card'}
      data-cy-status={subscription.status}
    >
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-1'}>
          <Heading type={4}>
            <span data-cy={'current-plan'}>Current Plan</span>
          </Heading>
          <div className={'flex items-center w-full'}>
            <Heading type={4}>
              <span data-cy={'subscription-name'}>{plan.name}</span>
            </Heading>

            <div>
              <SubscriptionStatusBadge subscription={subscription} />
            </div>
            <div className={'ml-auto'}>
              <span className={'flex items-center justify-end space-x-1'}>
                <PricingTable.Price>${plan.price}</PricingTable.Price>

                <span className={'lowercase text-gray-500 dark:text-gray-400'}>
                  {/* /{plan.name} */}
                  /monthly
                </span>
              </span>
            </div>
          </div>

          {/* <span className={'text-gray-500 dark:text-gray-400 text-sm'}>
            {details.product.description}
          </span> */}
        </div>

        {/* <If condition={isActive}>
          <RenewStatusDescription
            dates={dates}
            cancelAtPeriodEnd={cancelAtPeriodEnd}
          />
        </If> */}

        {/* <SubscriptionStatusAlert subscription={subscription} values={dates} /> */}
      </div>

      <div className={'flex items-center'}>
        <div className={'text-sm text-gray-500'}>Plan Limits:</div>
        {/* <div className={'grid grid-cols-3 gap-4'}> */}
        <div className="flex ml-2 items-center">
          <div className={'font-normal text-sm'}>
            {`${plan.max_pages === -1 ? 'Unlimited' : plan.max_pages}`}
          </div>
          <div className={'text-sm text-gray-500 ml-1'}> Pricing Websites</div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

function RenewStatusDescription(
  props: React.PropsWithChildren<{
    cancelAtPeriodEnd: boolean;
    dates: {
      endDate: string;
      trialEndDate: string | null;
    };
  }>,
) {
  return (
    <span className={'flex items-center space-x-1.5 text-sm'}>
      <If condition={props.cancelAtPeriodEnd}>
        <XCircleIcon className={'h-5 text-yellow-700'} />

        <span>
          <Trans
            i18nKey={'subscription:cancelAtPeriodEndDescription'}
            values={props.dates}
          />
        </span>
      </If>

      <If condition={!props.cancelAtPeriodEnd}>
        <CheckCircleIcon className={'h-5 text-green-700'} />

        <span>
          <Trans
            i18nKey={'subscription:renewAtPeriodEndDescription'}
            values={props.dates}
          />
        </span>
      </If>
    </span>
  );
}

function useSubscriptionDetails(priceId: string) {
  const products = configuration.stripe.products;

  return useMemo(() => {
    for (const product of products) {
      for (const plan of product.plans) {
        if (plan.stripePriceId === priceId) {
          return { plan, product };
        }
      }
    }
  }, [products, priceId]);
}

export default SubscriptionCard;
