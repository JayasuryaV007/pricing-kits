'use client';

import Trans from '~/core/ui/Trans';
import { SidebarItem, SidebarDivider, SidebarGroup } from '~/core/ui/Sidebar';

import createNavigationConfig from '~/navigation.config';
import { redirect, usePathname, useRouter } from 'next/navigation';
import Button from '~/core/ui/Button';

function AppSidebarNavigation({
  user,
}: React.PropsWithChildren<{
  user: string;
}>) {
  const path = usePathname();
  const router = useRouter();

  return (
    <>
      {createNavigationConfig(user).items.map((item, index) => {
        if ('divider' in item) {
          return <SidebarDivider key={index} />;
        }

        if ('children' in item) {
          return (
            <div
              key={item.label}
              className="flex gap-6"
              // label={<Trans i18nKey={item.label} defaults={item.label} />}
              // collapsible={item.collapsible}
              // collapsed={item.collapsed}
            >
              {item.children.map((child) => {
                return (
                  <Button
                    key={child.path}
                    // end={child.end}
                    // path={child.path}
                    // Icon={child.Icon}
                    onClick={() => router.replace(child.path)}
                    variant={'custom'}
                    className={`hover:font-bold cursor-pointer ${path === child.path ? 'font-bold' : ''}`}
                  >
                    <Trans i18nKey={child.label} defaults={child.label} />
                  </Button>
                );
              })}
            </div>
          );
        }

        return (
          <Button
            key={item.path}
            // end={item.end}
            // path={item.path}
            // Icon={item.Icon}
            variant={'custom'}
            onClick={() => router.replace(item.path)}
            className={`hover:font-bold cursor-pointer ${path === item.path ? 'font-bold' : ''}`}
          >
            <Trans i18nKey={item.label} defaults={item.label} />
          </Button>
        );
      })}
    </>
  );
}

export default AppSidebarNavigation;
