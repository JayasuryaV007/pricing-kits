'use client';

import useUserSession from '~/core/hooks/use-user-session';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import PlanSelectionForm from './PlanSelectionForm';
import IfHasPermissions from '~/components/IfHasPermissions';
import SubscriptionCard from './SubscriptionCard';
import BillingPortalRedirectButton from './BillingRedirectButton';

const Plans = ({ session }: { session: any }) => {
  if (!session) {
    return null;
  }
  const customerId = session.auth.user.id;
  const subscription = session.data?.subscription;
  if (!subscription) {
    return <PlanSelectionForm customerId={customerId} user={session.data} />;
  }
  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <div
          className={'border w-full lg:w-9/12 xl:w-6/12 rounded-xl divide-y'}
        >
          <div className={'p-6'}>
            <SubscriptionCard subscription={subscription} />
          </div>
          {/* <IfHasPermissions
            condition={() => {
              return true;
            }}
          > */}
          <If condition={customerId}>
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
          </If>
          {/* </IfHasPermissions> */}
        </div>
      </div>
    </div>
  );
};

export default Plans;
