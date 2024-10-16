'use client';
import { useState } from 'react';
import Tile from '~/core/ui/Tile';
import axios from 'axios';
import Alert from '~/core/ui/Alert';
import Spinner from '~/core/ui/Spinner';
import Image from 'next/image';
import ModalComponent from './ModalComponent';
import { Database } from '~/database.types';
import config from 'src/config/ui-config.json';

type Integrations = Database['public']['Tables']['app_configs']['Row'];

const IntegrationList = ({
  integrations,
}: {
  integrations: Integrations | null;
}) => {
  if (!integrations) {
    return;
  }

  const [data, setData] = useState(integrations);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [slackDisabled, setSlackDisabled] = useState(false);
  const [calendarDisabled, setCalendarDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [slackMsgEnable, setSlackMsgEnable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailOpen, setEmailIsOpen] = useState(false);
  const [isCalendarOpen, setCalendarIsOpen] = useState(false);
  const {
    showSlackComponent,
    showCalendarComponent,
    showGmailComponent
  } = config;

  const handleWebhookURL = (e: any) => {
    const { name, value }: { name: string; value: string } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateSlackIntegration = async () => {
    setSlackDisabled(true);
    let slackRegex = /^https:\/\/hooks\.slack\.com\/services\/[A-Z0-9]+\/[A-Z0-9]+\/[a-zA-Z0-9]+$/;
    if(data.webhook_url){
      if(!slackRegex.test(data.webhook_url)){
        setSlackMsgEnable(true)
        setErrorMsg("Please enter the valid webhook url")
      }else{
        setSlackMsgEnable(false)
        setErrorMsg("")
        try {
          let updatedData = {
            ...data,
            slack_notification: !data?.slack_notification,
          };
    
          await axios.put('/api/integration', updatedData).then((response: any) => {
            setData(response.data.data);
          });
        } catch (error) {
          console.error('Failed to update app configuration:', error);
        }
        setSlackDisabled(false);
        setIsOpen(false);
      }
    }else{
      setSlackMsgEnable(true)
      setErrorMsg("Please enter the webhook url")
    } 
  };

  const updateEmailIntegration = async () => {
    setEmailDisabled(true);
    try {
      let updatedData = {
        ...data,
        email_notification: !data?.email_notification,
      };

      await axios.put('/api/integration', updatedData).then((response: any) => {
        setData(response.data.data);
        setEmailIsOpen(false);
      });
    } catch (error) {
      console.error('Failed to update app configuration:', error);
    }
    setEmailDisabled(false);
  };

  const updateCalendarIntegration = async () => {
    setCalendarDisabled(true);

    try {
      let updatedData = {
        ...data,
        calendar_notification: !data?.calendar_notification,
      };

      await axios.put('/api/integration', updatedData).then((response: any) => {
        setData(response.data.data);
        setCalendarIsOpen(false);
      });
    } catch (error) {
      console.error('Failed to update app configuration:', error);
    }
    setCalendarDisabled(false);
  };

  return (
    <>
      {loading && (
        <div className="flex h-[calc(100vh-11rem)] items-center justify-center">
          <Spinner />
        </div>
      )}
      {successMessage && (
        <Alert type={'success'}>
          <Alert.Heading>
            Congratulations! Your app configuration is done.
          </Alert.Heading>
          {successMessage}
        </Alert>
      )}
      {!loading && (
        <div className="max-w-3xl mx-auto">
          <Tile>
            <div className="space-y-6">
              {(showSlackComponent && 
              <div className="flex items-center">
                <Image
                  src="/assets/images/slack.png"
                  alt=""
                  width="25"
                  height="25"
                />
                <span className="ml-4 font-semibold">Slack</span>
                <ModalComponent
                  action="Connect Slack"
                  integrations={data}
                  updateSlackIntegration={updateSlackIntegration}
                  slackDisabled={slackDisabled}
                  handleWebhookURL={handleWebhookURL}
                  errorMsg={errorMsg}
                  slackMsgEnable={slackMsgEnable}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />

              </div>
              )}
              {(showCalendarComponent && 
              <div className="flex items-center">
                <Image
                  src="/assets/images/google-calendar.png"
                  alt=""
                  width="25"
                  height="25"
                />
                <span className="ml-4 font-semibold">Google Calendar</span>
                <ModalComponent
                  action="Connect Calendar"
                  integrations={data}
                  updateCalendarIntegration={updateCalendarIntegration}
                  calendarDisabled={calendarDisabled}
                  setCalendarIsOpen={setCalendarIsOpen}
                  isCalendarOpen={isCalendarOpen}
                 
                />
              </div>
              )}
              {(showGmailComponent &&
              <div className="flex items-center">
                <Image
                  src="/assets/images/gmail.png"
                  alt=""
                  width="25"
                  height="25"
                />
                <span className="ml-4 font-semibold">Gmail</span>
                <ModalComponent
                  action="Connect Email"
                  integrations={data}
                  updateEmailIntegration={updateEmailIntegration}
                  emailDisabled={emailDisabled}
                  isEmailOpen={isEmailOpen}
                  setEmailIsOpen={setEmailIsOpen}
                />
              </div>
              )}
            </div>
          </Tile>
        </div>
      )}
    </>
  );
};

export default IntegrationList;
