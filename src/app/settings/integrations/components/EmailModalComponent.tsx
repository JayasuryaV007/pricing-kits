import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Button from '~/core/ui/Button';

const EmailModalComponent = ({
  setIsOpen,
  updateEmailIntegration,
  email_notification,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  updateEmailIntegration: any;
  email_notification?: boolean;
}) => {
  return (
    <>
      <div className="">
        <div>
          Would you like to confirm
          <span className="mx-1">
            {email_notification ? 'disabling' : 'enabling'}
          </span>
          Gmail Notifications?
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          variant="outlinePrimary"
          onClick={() => {
            updateEmailIntegration();
          }}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};
export default EmailModalComponent;
