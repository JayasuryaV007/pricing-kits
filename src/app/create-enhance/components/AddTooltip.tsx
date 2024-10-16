import React, { useState } from 'react';
import { ElementData } from './StepOne';
import {
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from '~/core/ui/TextField';
import Tile from '~/core/ui/Tile';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Button from '~/core/ui/Button';

const AddTooltip = ({
  selectedElement,
  closeModal,
}: {
  selectedElement: ElementData | null;
  closeModal: any;
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [articleUrl, setArticleUrl] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log({ title, description, mediaFile, articleUrl });
    const error = validate();
    if (!error) {
      closeModal();
    }
  };

  const validate = () => {
    if (!title) {
      setError(`*Title is Required`);
      return 'error';
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-base font-medium mb-4">{selectedElement?.text}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <TextFieldLabel>
              Enter Title (Required)
              <TextFieldInput
                id="title"
                value={title}
                onChange={(e: any) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                placeholder="Enter Title"
                required
              />
            </TextFieldLabel>
            {error && <TextFieldError error="* Title is Required" />}
          </div>

          <div>
            <TextFieldLabel>
              Enter Description (Optional)
              <TextFieldInput
                id="description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </TextFieldLabel>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <TextFieldLabel>
            Drop Image / Video (Optional)
            <Tile>
              <TextFieldInput
                type="file"
                id="media"
                className="hidden"
                accept="image/png,image/jpeg,image/gif,video/mp4,video/mov"
                onChange={(e: any) => setMediaFile(e.target.files[0])}
              />
              <div className="pb-3 cursor-pointer">
                <PhotoIcon className="h-5 w-5 mx-auto" />
                <p className="mt-1 text-center">
                  <TextFieldLabel className="mx-auto w-full">
                    PNG / JPEG / GIF / MP4 / MOV
                  </TextFieldLabel>
                </p>
              </div>
            </Tile>
          </TextFieldLabel>
        </div>

        <div>
          <TextFieldLabel>
            Add Article URL (Optional)
            <TextFieldInput
              id="articleUrl"
              value={articleUrl}
              onChange={(e: any) => setArticleUrl(e.target.value)}
              placeholder="Enter Article URL"
            />
          </TextFieldLabel>
        </div>
      </div>
      <div className="flex">
        <Button onClick={handleSave} className="ml-auto font-semibold">
          Save
        </Button>
      </div>
    </>
  );
};

export default AddTooltip;
