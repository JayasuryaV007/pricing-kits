import React, { useContext, useState } from 'react';
import { ElementData } from './Stepper';
import {
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from '~/core/ui/TextField';
import Tile from '~/core/ui/Tile';
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import Button from '~/core/ui/Button';
import UserSessionContext from '~/core/session/contexts/user-session';
import useAddTooltipMutation from '~/core/hooks/use-add-tooltip';
import { toast } from 'react-toastify';

const AddTooltip = ({
  selectedElement,
  closeModal,
  url,
  projectId,
}: {
  selectedElement: ElementData | null;
  closeModal: any;
  url: string;
  projectId: string;
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [articleUrl, setArticleUrl] = useState('');
  const [error, setError] = useState('');
  const { userSession } = useContext(UserSessionContext);
  const addTooltipMutation = useAddTooltipMutation();

  const handleSave = async () => {
    const error = validate();
    if (!error) {
      const formData = new FormData();
      formData.append('user_id', userSession?.data?._id || '');
      formData.append('project_id', projectId);
      formData.append('url', url);
      formData.append('text', JSON.stringify(selectedElement));
      formData.append('title', title);
      formData.append('description', description);
      formData.append('article_url', articleUrl);
      if (mediaFile) {
        formData.append('media', mediaFile);
      }

      try {
        await addTooltipMutation.trigger(formData);
        toast.success('Tooltip Added');
        closeModal();
      } catch (error: any) {
        console.error('Error adding tooltip:', error);
        toast.error(error.message || 'Failed to add tooltip');
      }
    }
  };

  const validate = () => {
    if (!title) {
      setError('*Title is Required');
      return 'error';
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
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
              {!mediaFile ? (
                <>
                  <TextFieldInput
                    type="file"
                    id="media"
                    className="hidden"
                    accept="image/png,image/jpeg,image/gif,video/mp4,video/mov"
                    onChange={handleFileChange}
                  />
                  <div className="pb-3 cursor-pointer">
                    <PhotoIcon className="h-5 w-5 mx-auto" />
                    <p className="mt-1 text-center cursor-pointer">
                      <TextFieldLabel className="mx-auto w-full cursor-pointer">
                        PNG / JPEG / GIF / MP4 / MOV
                      </TextFieldLabel>
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <TrashIcon
                    className="w-5 h-5"
                    onClick={() => setMediaFile(null)}
                  />
                  <p onClick={() => setMediaFile(null)}>Remove</p>
                </div>
              )}
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
        <Button
          onClick={handleSave}
          className="ml-auto font-semibold"
          loading={addTooltipMutation.isMutating}
          disabled={addTooltipMutation.isMutating}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default AddTooltip;
