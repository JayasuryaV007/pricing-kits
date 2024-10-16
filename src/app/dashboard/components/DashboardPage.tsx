'use client';
import AppHeader from './AppHeader';
import Spinner from '~/core/ui/Spinner';
import Button from '~/core/ui/Button';
import { redirect, useRouter } from 'next/navigation';

const DashboardPage = ({}: {}) => {
  const router = useRouter();

  if (false) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="lg:hidden block">
        {' '}
        <AppHeader title="Pricing Kits"></AppHeader>
      </div>
      <div className={'flex flex-col space-y-6 pb-8 max-w-7xl mx-auto mt-20'}>
        <div className="my-4">
          <span className="font-bold text-sky-800 text-lg mx-auto dark:text-white">
            Dashboard
          </span>{' '}
        </div>
        <div className="border border-gray-200 shadow-sm dark:border-dark-900 p-4">
          <div className="flex w-full justify-between items-center">
            <span className="font-semibold text-lg">Enhance Pricing Page</span>
            <Button
              className="font-semibold"
              onClick={() => router.push('/create-enhance')}
            >
              Create Enhance
            </Button>
          </div>
        </div>

        <div className="text-center font-light pt-8">
          No Enhancements added Yet - Time to Create Something New!
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
