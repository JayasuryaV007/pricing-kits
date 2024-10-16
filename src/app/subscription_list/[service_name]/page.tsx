
import { FC } from 'react';
import ServiceTableComponent from '../components/ServiceTableComponent';
import { loadUserSubscriptionService } from '~/lib/server/loaders/load-user-subscription-service';

interface SubscriptionListPageProps {
  params: {
    service_name: string;
  };
}  
const Subscription_List: FC<SubscriptionListPageProps> = async({ params }) => {
    const { service_name } = params;
  const userSubscriptions = await loadUserSubscriptionService(service_name);
  return (
    <>
      <ServiceTableComponent userSubscriptions={userSubscriptions}/>
    </>
  );
};

export default Subscription_List;