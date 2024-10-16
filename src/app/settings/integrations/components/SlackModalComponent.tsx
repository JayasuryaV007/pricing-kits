import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Button from '~/core/ui/Button';
import Label from '~/core/ui/Label';
import { TextFieldInput } from '~/core/ui/TextField';

const SlackModalComponent = ({
  setIsOpen,
  updateSlackIntegration,
  slack_notification,
  webhook_url,
  handleWebhookURL,
  errorMsg,
  slackMsgEnable,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  updateSlackIntegration: any;
  slack_notification?: boolean;
  webhook_url?: string | null;
  handleWebhookURL: any;
  errorMsg:any;
  slackMsgEnable:boolean
}) => {

 
  return (
    <>
      <div className="space-y-4">
        <Label>Webhook URL</Label>
        <TextFieldInput
          value={webhook_url || ''}
          onChange={(e) => handleWebhookURL(e)}
          name="webhook_url"
        />
        {slackMsgEnable &&
          <span style={{color:'red',fontSize:'0.8rem'}}>{errorMsg}</span>
        }
        
        <div>
          Would you like to confirm
          <span className="mx-1">
            {slack_notification ? 'disabling' : 'enabling'}
          </span>
          Slack Notifications?
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          variant="outlinePrimary"
          onClick={() => {
            updateSlackIntegration();
           
          }}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};
export default SlackModalComponent;
