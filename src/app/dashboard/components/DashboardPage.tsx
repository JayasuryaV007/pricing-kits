'use client';
import AppHeader from './AppHeader';
import Spinner from '~/core/ui/Spinner';
import Button from '~/core/ui/Button';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserSessionContext from '~/core/session/contexts/user-session';
import useFetchProductMutation from '~/core/hooks/use-fetch-products';
import ProductContents from './ProductContents';

const DashboardPage = ({}: {}) => {
  const router = useRouter();
  const fetchProductMutation = useFetchProductMutation();
  const { userSession } = useContext(UserSessionContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!!userSession?.data) {
      fetchProducts();
    }
  }, [userSession]);

  const fetchProducts = async () => {
    try {
      const response = await fetchProductMutation.trigger(
        userSession?.data?._id || '',
      );
      setProducts(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (fetchProductMutation.isMutating) {
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
        <AppHeader title="Pricing Flows"></AppHeader>
      </div>
      <div
        className={'flex flex-col space-y-6 pb-8 max-w-7xl mx-auto md:mt-20'}
      >
        <div className="my-4 w-full flex items-center">
          <span className="font-bold text-primary text-lg dark:text-white">
            Enhanced Pricing Pages
          </span>{' '}
          <div className="ml-auto flex">
            <Button
              className="font-semibold ml-auto"
              onClick={() => router.push('/create-enhance')}
            >
              Create Enhance
            </Button>
          </div>
        </div>
        <ProductContents products={products} />
      </div>
    </>
  );
};

export default DashboardPage;
