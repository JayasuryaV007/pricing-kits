'use client';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import SubscriptionCard from './SubscriptionCard';

import IfHasPermissions from '~/components/IfHasPermissions';
import BillingPortalRedirectButton from './BillingRedirectButton';
import useUserSession from '~/core/hooks/use-user-session';
import PlanSelectionForm from './PlanSelectionForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Plans: React.FC = () => {
  const user = useUserSession();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return null;
  }

  useEffect(() => {
    async function fetchSubscription() {
      if (!user?.data?._id) return;

      try {
        const response = await axios.get('/api/current-subscriptions', {
          params: { user_id: user.data._id },
        });

        const subscription = response.data.data;
        console.log(subscription);

        if (subscription.length > 0) {
          console.log(subscription[0]);
          setSubscription(subscription[0]);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
      setLoading(false);
    }

    fetchSubscription();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const customerId = user?.auth?.user._id;
  // const subscription = {
  //   id: 'sub_1QWZERJ5SldqW1HcQfDtVChR',
  //   user_id: '670618bf9d7083281326b7f2',
  //   price_id: 'price_1PiV65Ddqcz8yRjh8JtZuf07',
  //   stripe_customer_id: 'cus_RPO0MQOllzvczd',
  //   status: 'active',
  //   trial_starts_at: null,
  //   trial_ends_at: null,
  //   current_period_starts_at: '2024-12-16T08:00:47+00:00',
  //   current_period_ends_at: '2025-01-16T08:00:47+00:00',
  //   cancel_at_period_end: false,
  //   created_at: '2024-12-16T08:01:04.537+00:00',
  //   updated_at: '2024-12-16T08:01:04.537+00:00',
  //   subscription_plans: {
  //     name: 'Basic',
  //     price: 7,
  //     // max_pages: 1200,
  //     // max_ai_links: 50,
  //     max_websites: 3,
  //   },
  // };

  if (!subscription) {
    return <PlanSelectionForm customerId={customerId} user={user.data} />;
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <div className={'border w-full lg:w-11/12 mx-auto rounded-xl divide-y'}>
          <div className={'p-6'}>
            <SubscriptionCard subscription={subscription} />
          </div>
          <PlanSelectionForm
            customerId={customerId}
            user={user.data}
            currentPlan={subscription?.price_id}
          />
          ;{/* <IfHasPermissions condition={true}> */}
          {/* <If condition={customerId}>
            <div className={'flex justify-end p-6'}>
              <div className={'flex flex-col space-y-2 items-end'}>
                <BillingPortalRedirectButton customerId={customerId as string}>
                  <Trans i18nKey={'subscription:manageBilling'} />
                </BillingPortalRedirectButton>

                <span className={'text-xs text-gray-500 dark:text-gray-400'}>
                  <Trans i18nKey={'subscription:manageBillingDescription'} />
                </span>
              </div>
            </div>
          </If> */}
          {/* </IfHasPermissions> */}
        </div>
      </div>
    </div>
  );
};

export default Plans;
