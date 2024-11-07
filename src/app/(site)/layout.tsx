import Footer from '~/app/(site)/components/Footer';
import I18nProvider from '~/i18n/I18nProvider';
import SiteHeaderSessionProvider from '~/app/(site)/components/SiteHeaderSessionProvider';
import loadUserData from '~/lib/server/loaders/load-user-data';

async function SiteLayout(props: React.PropsWithChildren) {
  const { language } = await loadUserData();
  return (
    <I18nProvider lang={language}>
      <SiteHeaderSessionProvider />

      {props.children}

      <Footer />
    </I18nProvider>
  );
}

export default SiteLayout;
