import React from 'react';

import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import { withI18n } from '~/i18n/with-i18n';
import { PageBody } from '~/core/ui/Page';
import Trans from '~/core/ui/Trans';
import configuration from '~/configuration';
import AppHeader from '~/app/dashboard/components/AppHeader';
import Container from '~/core/ui/Container';

const getLinks = (organizationId: string) => [
  {
    path: '/settings/integrations',
    label: 'common:profileSettingsTabLabel',
  },
  {
    path: '/settings/subscriptions',
    label: 'common:subscriptionSettingsTabLabel',
  },
];

async function SettingsLayout({
  children,
  params,
}: React.PropsWithChildren<{
  params: {
    organization: string;
  };
}>) {
  const links = getLinks(params.organization);

  return (
    <>
      <Container>
        <AppHeader
          title={<Trans i18nKey={'common:settingsTabLabel'} />}
          description={<Trans i18nKey={'common:settingsTabDescription'} />}
        />

        <PageBody>
          <NavigationMenu bordered>
            {links.map((link) => (
              <NavigationItem
                className={'flex-1 lg:flex-none'}
                link={link}
                key={link.path}
              />
            ))}
          </NavigationMenu>

          <div
            className={`mt-4 space-y-4 lg:space-x-8 lg:space-y-0 h-full`}
          >
            {children}
          </div>
        </PageBody>
      </Container>
    </>
  );
}

export default withI18n(SettingsLayout);

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;

  return `${appPrefix}/${organizationId}/${path}`;
}
