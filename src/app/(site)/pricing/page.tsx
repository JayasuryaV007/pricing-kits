import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';
import { withI18n } from '~/i18n/with-i18n';
import PlansStatusAlertContainer from './components/PlanStatusAlertContainer';
import Plans from './components/Plans';
import loadUserData from '~/lib/server/loaders/load-user-data';

export const metadata = {
  title: 'Pricing',
};

async function PricingPage() {
  // const { session } = await loadUserData();
  return (
    <Container>
      <div className={'flex flex-col space-y-16 my-8'}>
        <div className={'flex flex-col items-center space-y-4'}>
          <Heading type={1}>Pricing</Heading>

          <SubHeading>
            Our pricing is designed to scale with your business. Get started for
            free, then grow with us.
          </SubHeading>
        </div>

        <PlansStatusAlertContainer />

        <Plans />
      </div>
    </Container>
  );
}

export default withI18n(PricingPage);
