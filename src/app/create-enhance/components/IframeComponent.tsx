import React, { useState, useEffect, useRef } from 'react';
import { ElementData } from './Stepper';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Button from '~/core/ui/Button';
import { toast } from 'react-toastify';
import ModalComponent from '~/app/dashboard/components/Common/ModalComponent';
interface AssetData {
  [key: string]: any;
}

const IframeComponent = ({
  url,
  setButtonDisabled,
  setSelectedElement,
  setCurrentStep,
  selectedElement,
  projectId,
}: {
  url: string;
  setButtonDisabled: any;
  setSelectedElement: any;
  setCurrentStep: any;
  selectedElement: ElementData | null;
  projectId: string;
}) => {
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === 'ELEMENT_SELECTED') {
        console.log('Selected selector:', event.data.selector);
        addSelectedElement(event.data.selector);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const addSelectedElement = (selector: string) => {
    setSelectedElement(JSON.parse(selector));
    setButtonDisabled(false);
  };

  const fetchAssetData = async (elementData: any) => {
    if (!selectedElement) {
      toast.error('Select one Word or sentence');
      return;
    }
    setIsOpen(true);
    const response = await fetch('/api/getAssetData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(elementData),
    });
    const data: AssetData = await response.json();
    setAssetData(data);
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex-grow relative">
          <iframe
            ref={iframeRef}
            src={`/api/proxy?url=${encodeURIComponent(url)}`}
            className="w-full h-full border-2"
          />
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={() => setCurrentStep(1)}>
            <ChevronLeftIcon className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={() => fetchAssetData('')} variant="outlinePrimary">
            Add Tooltip
          </Button>
          <Button onClick={() => setCurrentStep(3)}>
            Next Step
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <ModalComponent
        url={url}
        selectedElement={selectedElement}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        projectId={projectId}
      />
    </>
  );
};

export default IframeComponent;
