'use client';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import SubscriptionCard from './SubscriptionCard';

import IfHasPermissions from '~/components/IfHasPermissions';
import BillingPortalRedirectButton from './BillingRedirectButton';
import useUserSession from '~/core/hooks/use-user-session';
import PlanSelectionForm from './PlanSelectionForm';

const Plans: React.FC = () => {
  const user = useUserSession();

  if (!user) {
    return null;
  }

  const customerId = user?.auth?.user._id;
  const subscription = user.data?.subscription;

  if (!subscription) {
    return <PlanSelectionForm customerId={customerId} user={user.data} />;
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

          {/* <IfHasPermissions condition={true}> */}
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
