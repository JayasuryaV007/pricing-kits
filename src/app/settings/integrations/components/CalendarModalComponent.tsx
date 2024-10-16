import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Button from '~/core/ui/Button';

const CalendarModalComponent = ({
  setIsOpen,
  updateCalendarIntegration,
  calendar_notification,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  updateCalendarIntegration: any;
  calendar_notification?: boolean;
}) => {
  return (
    <>
      <div className="">
        <div>
          Would you like to confirm
          <span className="mx-1">
            {calendar_notification ? 'disabling' : 'enabling'}
          </span>
          Calendar Notifications?
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          variant="outlinePrimary"
          onClick={() => {
            updateCalendarIntegration();           
          }}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};
export default CalendarModalComponent;
