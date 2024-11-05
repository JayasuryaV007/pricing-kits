'use client';
import { useContext, useEffect, useState } from 'react';
import AppHeader from '~/app/dashboard/components/AppHeader';
import Stepper from '~/core/ui/Stepper';
import ProductForm from './ProductForm';
import CdnForm from './CdnForm';
import IframeComponent from './IframeComponent';
import useCreateProduct from '~/core/hooks/use-create-product';
import UserSessionContext from '~/core/session/contexts/user-session';
import { toast } from 'react-toastify';
import useUpdateProduct from '~/core/hooks/use-update-product';
import { useSearchParams } from 'next/navigation';
import useFetchProductMutation from '~/core/hooks/use-fetch-product';

export interface ElementData {
  id: string;
  className: string;
  tagName: string;
  text: string;
}

const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    productWebsiteURL: '',
    productPricingURL: '',
    productDescription: '',
    _id: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(
    null,
  );

  const { userSession } = useContext(UserSessionContext);

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const fetchProductMutation = useFetchProductMutation();

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      fetchProduct(id);
    }
  }, [searchParams]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetchProductMutation.trigger(id);
      const { data } = response;
      setFormData({
        productName: data.name,
        productWebsiteURL: data.product_website_url,
        productPricingURL: data.product_pricing_url,
        productDescription: data.description,
        _id: data._id,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleProductSubmit = async (e: any) => {
    e.preventDefault();
    let existingData = formData;
    if (
      !formData.productWebsiteURL.startsWith('http://') &&
      !formData.productWebsiteURL.startsWith('https://')
    ) {
      let existingUrl = 'https://' + formData.productWebsiteURL;
      existingData = {
        ...existingData,
        productWebsiteURL: existingUrl,
      };
    }
    if (
      !formData.productPricingURL.startsWith('http://') &&
      !formData.productPricingURL.startsWith('https://')
    ) {
      let existingUrl = 'https://' + formData.productPricingURL;
      existingData = {
        ...existingData,
        productPricingURL: existingUrl,
      };
    }
    setFormData(existingData);
    try {
      let credentials = {
        user_id: userSession?.data?._id || '',
        name: existingData.productName,
        description: existingData.productDescription,
        product_website_url: existingData.productWebsiteURL,
        product_pricing_url: existingData.productPricingURL,
      };
      if (!formData._id) {
        const response = await createProductMutation.trigger(credentials);
        setFormData({
          ...formData,
          _id: response.data._id,
        });
      } else {
        const response = await updateProductMutation.trigger(credentials);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    setCurrentStep(2);
  };

  const handleReviewSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <div className="lg:hidden block">
        <AppHeader title="Pricing Kits"></AppHeader>
      </div>
      <div className="w-full mx-auto md:p-6 md:mt-20">
        <div className="my-8 ">
          <Stepper
            steps={['Product Details', 'Add Tooltip', 'Generate CDN']}
            currentStep={currentStep - 1}
          />
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6 mt-16 mb-4 md:h-[calc(100vh-18rem)] h-full">
          {currentStep === 1 && (
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              handleProductSubmit={handleProductSubmit}
              loading={
                createProductMutation.isMutating ||
                updateProductMutation.isMutating
              }
            />
          )}

          {currentStep === 2 && (
            <IframeComponent
              url={formData.productPricingURL}
              setButtonDisabled={setButtonDisabled}
              setSelectedElement={setSelectedElement}
              setCurrentStep={setCurrentStep}
              selectedElement={selectedElement}
              projectId={formData._id}
            />
          )}

          {currentStep === 3 && (
            <CdnForm
              formData={formData}
              setCurrentStep={setCurrentStep}
              handleReviewSubmit={handleReviewSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StepperComponent;
