import fetch from 'node-fetch';

const webhookUrl = process.env.SLACK_WEBHOOK_URL;

export const sendSlackAlert = async (message: string) => {
  if (!webhookUrl) {
    throw new Error("Slack Webhook URL is not set");
  }

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message }),
  });
};
