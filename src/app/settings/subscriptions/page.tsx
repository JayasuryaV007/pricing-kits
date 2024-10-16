import Plans from './components/Plans';
import PlansStatusAlertContainer from './components/PlanStatusAlertContainer';
import { withI18n } from '~/i18n/with-i18n';

const SubscriptionSettingsPage = () => {
  return (
    <div className={'flex flex-col space-y-4 w-full h-[200vh]'}>
      <PlansStatusAlertContainer />

      <Plans />
    </div>
  );
};

export default withI18n(SubscriptionSettingsPage);
