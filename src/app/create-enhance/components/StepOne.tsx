'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '~/core/ui/Button';
import { TextFieldInput } from '~/core/ui/TextField';
import IframeComponent from './IframeComponent';
import Modal from '~/core/ui/Modal';
import ModalComponent from '~/app/dashboard/components/Common/ModalComponent';

export interface ElementData {
  id: string;
  className: string;
  tagName: string;
  text: string;
}

const StepOneComponent = () => {
  const [url, setUrl] = useState('');
  const [showIframe, canShowIframe] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      new URL(url);
      canShowIframe(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col pb-8 max-w-7xl mx-auto mt-20">
        <div className="mt-2 mb-4 flex w-full">
          <span className="font-bold text-sky-800 text-lg dark:text-white">
            Enhance Pricing Page
          </span>{' '}
          {showIframe && (
            <Button
              className="ml-auto"
              disabled={buttonDisabled}
              onClick={() => setIsOpen(true)}
            >
              Add Tooltip
            </Button>
          )}
        </div>
        {!showIframe ? (
          <div className="border border-gray-200 shadow-sm dark:border-dark-900 p-4">
            <div className="md:flex w-full justify-between items-center">
              <span className="font-semibold text-lg whitespace-nowrap mr-64">
                Enter Your Pricing Page URL
              </span>
              <TextFieldInput
                className="mt-6"
                value={url}
                onChange={(e: any) => {
                  canShowIframe(false);
                  setUrl(e.target.value);
                }}
              />
            </div>
            <div className="w-full flex">
              <Button
                className="font-semibold md:ml-auto mt-6 mx-auto md:mr-0"
                onClick={(e) => handleSubmit(e)}
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <>
            <IframeComponent
              url={url}
              setButtonDisabled={setButtonDisabled}
              setSelectedElement={setSelectedElement}
            />
            <ModalComponent
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedElement={selectedElement}
            />
          </>
        )}
      </div>
    </>
  );
};

export default StepOneComponent;
