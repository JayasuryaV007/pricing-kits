import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import { useState } from 'react';
import EmailModalComponent from './EmailModalComponent';
import { Database } from '~/database.types';
import SlackModalComponent from './SlackModalComponent';
import CalendarModalComponent from './CalendarModalComponent';

type Integrations = Database['public']['Tables']['app_configs']['Row'];

const ModalComponent = ({
  action,
  integrations,
  updateEmailIntegration,
  updateSlackIntegration,
  updateCalendarIntegration,
  handleWebhookURL,
  emailDisabled,
  slackDisabled,
  calendarDisabled,
  errorMsg,
  slackMsgEnable,
  setIsOpen,
  isOpen,
  isEmailOpen,
  setEmailIsOpen,
  setCalendarIsOpen,
  isCalendarOpen,
}: {
  action: string;
  email_notification?: boolean;
  integrations: Integrations | null;
  updateEmailIntegration?: any;
  updateSlackIntegration?: any;
  updateCalendarIntegration?: any;
  handleWebhookURL?: any;
  emailDisabled?: boolean;
  slackDisabled?: boolean;
  calendarDisabled?: boolean;
  errorMsg?: any;
  slackMsgEnable?: boolean;
  setIsOpen?: any;
  isOpen?: any;
  isEmailOpen?: any;
  setEmailIsOpen?: any;
  setCalendarIsOpen?: any;
  isCalendarOpen?: any;
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  console.log('action');
  console.log(action);
  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        heading={
          integrations?.slack_notification
            ? 'Disable Slack Notification'
            : 'Enable Slack Notification'
        }
        Trigger={
          <Button
            disabled={slackDisabled}
            className={`ml-auto ${integrations?.slack_notification ? '' : 'px-2'}`}
            variant={
              integrations?.slack_notification ? 'destructive' : 'default'
            }
          >
            {integrations?.slack_notification ? 'Disconnect' : 'Connect'}
          </Button>
        }
      >
        <SlackModalComponent
          setIsOpen={setIsOpen}
          updateSlackIntegration={updateSlackIntegration}
          slack_notification={integrations?.slack_notification}
          webhook_url={integrations?.webhook_url}
          handleWebhookURL={handleWebhookURL}
          errorMsg={errorMsg}
          slackMsgEnable={slackMsgEnable || false}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
