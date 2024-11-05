import {
  EyeIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import { Section, SectionBody, SectionHeader } from '~/core/ui/Section';
import Tile from '~/core/ui/Tile';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

const TooltipContents = ({ content }: { content: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <InformationCircleIcon className="w-4 h-4 ml-auto cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent side="right">
          <div className="p-2 w-64">
            <div className="text-lg">{content.title}</div>
            {content.description && (
              <div className="text-base font-medium w-64 mt-2">
                {content.description}
              </div>
            )}
            {content.image_url && (
              <Image
                alt=""
                src={content.image_url}
                width={150}
                height={150}
                className="mt-2 cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
            {content.article_url && (
              <Button
                className="mt-4"
                onClick={() => window.open(content.article_url, '_blank')}
              >
                {'Learn More ->'}
              </Button>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
      <Modal heading="Preview" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Image
          alt=""
          src={content.image_url}
          width={500}
          height={500}
          className="mt-2"
        />
      </Modal>
    </>
  );
};

export default TooltipContents;
