import {
  ChevronLeftIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TooltipContents from '~/app/dashboard/components/TooltipContents';
import useFetchTooltipMutation from '~/core/hooks/use-fetch-tooltip';
import useGenerateCDNMutation from '~/core/hooks/use-generate-cdn';
import UserSessionContext from '~/core/session/contexts/user-session';
import Button from '~/core/ui/Button';
import Spinner from '~/core/ui/Spinner';
import { TextFieldInput } from '~/core/ui/TextField';

function CdnForm({ formData, setCurrentStep, handleReviewSubmit }: any) {
  const fetchTooltipsMutation = useFetchTooltipMutation();
  const { userSession } = useContext(UserSessionContext);
  const [tooltips, setTooltips] = useState([]);
  const [cdnURL, setCdnURL] = useState('');
  const router = useRouter();
  const generateCDNMutation = useGenerateCDNMutation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (formData._id) {
      fetchAssetData();
    }
  }, []);

  const fetchAssetData = async () => {
    try {
      const response = await fetchTooltipsMutation.trigger({
        projectId: formData._id,
        userId: userSession?.data?._id || '',
      });
      console.log(response.data);
      setTooltips(response.data);
    } catch (error: any) {}
  };

  const generateCDN = async () => {
    try {
      const response = await generateCDNMutation.trigger({
        projectId: formData._id,
        tooltips: tooltips,
        metadata: {
          productName: formData.productName,
          productWebsiteURL: formData.productWebsiteURL,
          productDescription: formData.productDescription,
          productPricingURL: formData.productPricingURL,
        },
      });
      console.log(response.data);
      setCdnURL(response.data);
    } catch (error: any) {}
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cdnURL);
      setCopied(true);
      toast.success('CDN URL Copied...');

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (fetchTooltipsMutation.isMutating) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-gray-600">Product Name</p>
            <p className="font-medium">{formData.productName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Product Website URL</p>
            <p className="font-medium">{formData.productWebsiteURL}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Description</p>
            <p className="font-medium">{formData.productDescription}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Product Pricing URL</p>
            <p className="font-medium">{formData.productPricingURL}</p>
          </div>
        </div>
      </div>
      <div className="md:w-96 mx-auto flex w-full">
        <TextFieldInput className="bg-white " value={cdnURL} />
        {cdnURL ? (
          <Button
            className={`whitespace-nowrap ${copied ? 'ml-[-64px]' : 'ml-[-128px]'}`}
            onClick={() => handleCopy()}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        ) : (
          <Button
            className="whitespace-nowrap ml-[-128px]"
            onClick={() => generateCDN()}
            disabled={tooltips.length === 0}
          >
            Generate CDN
          </Button>
        )}
      </div>
      <div className="h-full border md:w-96 mx-auto flex flex-col gap-4 p-4">
        {tooltips.length > 0 ? (
          <>
            {tooltips.map((tooltip: any) => (
              <div className="flex w-full">
                <div className="w-5/6">{JSON.parse(tooltip.text).text}</div>
                <div className="w-1/6 mt-1">
                  <div className="ml-auto w-1/6">
                    <TooltipContents content={tooltip} />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <span className="text-center font-semibold md:mt-6 w-full">
            No Enhancements Added Yet
          </span>
        )}
      </div>
      <div className="flex justify-between md:mt-auto mt-6">
        <Button onClick={() => setCurrentStep(2)}>
          <ChevronLeftIcon className="w-4 h-4" />
          Back
        </Button>
        <Button onClick={() => router.push('dashboard')}>
          Go To Dashboard
        </Button>
      </div>
    </div>
  );
}

export default CdnForm;
