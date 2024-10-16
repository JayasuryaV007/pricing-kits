// pages/api/cron-job.js

import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import moment from 'moment';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or key is not defined');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('status', 'Active');

    if (error) {
      throw error;
    }

    if (data) {
      for (const fruit of data) {
        let nextBillingDate = fruit.next_billing_date;
        let serviceUrl = fruit.service_url;
        let date = moment(nextBillingDate, 'DD-MM-YYYY').toDate();
        date.setDate(date.getDate() - 1);

        let billingDate = moment(date).format('DD-MM-YYYY');
        let currentDate = new Date();
        let formattedDate = moment(currentDate).format('DD-MM-YYYY');
        if (billingDate <= formattedDate) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('email')
            .eq('user_id', fruit.user_id)
            .maybeSingle();

          const { data: appData, error: usersError } = await supabase
            .from('app_configs')
            .select('*')
            .eq('user_id', fruit.user_id)
            .maybeSingle();

          if (userError) {
            console.error('Error fetching user data:', userError.message);
          } else {
            if (appData && userData) {
              if (appData.slack_notification) {
                const webHookUrl = appData.webhook_url;
                await sendNotification(
                  userData,
                  serviceUrl,
                  billingDate,
                  webHookUrl,
                );
              }
              if (appData.email_notification) {
                await sendMailNotification(userData, serviceUrl, billingDate);
              }
              if (appData.calendar_notification) {
                let email = userData.email;
                await createCalendarEvent(email, serviceUrl, billingDate);
              }
            }
          }
        }
      }
    }
    return NextResponse.json(
      { message: 'Notifications processed successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Send Slack Notification
const sendNotification = async (
  userData: any,
  serviceUrl: string,
  billingDate: any,
  webhook_url: string,
) => {
  const email = userData.email;
  if (!serviceUrl) {
    console.error('Service URL is undefined for the user:', userData);
    return;
  }
  const myArray = email.split('@');
  const slackUserName = myArray[0];
  let spliturl = serviceUrl.split('.');
  let serviceName = spliturl[1];

  await axios.post(webhook_url, {
    text: `Dear ${slackUserName},
            This is a friendly reminder that your subscription with ${serviceName} is due for renewal on ${billingDate}.
            Please ensure that your payment is completed by the due date to avoid any interruption in your service.
            If you have already made the payment, please disregard this email.
            Thank you for being a valued customer.
            
            Best regards,
            ${serviceName}`,
  });
};

//Send Mail Notification
const sendMailNotification = async (
  userData: any,
  serviceUrl: string,
  billingDate: any,
) => {
  const email = userData.email;
  const myArray = email.split('@');
  const emailUserName = myArray[0];
  const transporter = nodemailer.createTransport({
    // @ts-ignore
    host: process.env.ETHEREAL_HOST,
    port: process.env.ETHEREAL_PORT,
    secure: false,
    auth: {
      user: process.env.MAILER_EMAIL_USER,
      pass: process.env.MAILER_EMAIL_PASS,
    },
  });

  let spliturl = serviceUrl.split('.');
  let serviceName = spliturl[1];
  await transporter.sendMail({
    from: process.env.FROM_ACCOUNT,
    to: userData.email,
    subject: 'Payment Reminder: Subscription Renewal',
    text: `Dear ${emailUserName},
          This is a friendly reminder that your subscription with ${serviceName} is due for renewal on ${billingDate}.
          Please ensure that your payment is completed by the due date to avoid any interruption in your service.
          If you have already made the payment, please disregard this email.
          Thank you for being a valued customer.
          
          Best regards,
          ${serviceName}`,
    html: `<p>Dear ${emailUserName},</p>
          <p>This is a friendly reminder that your subscription with <strong>${serviceName}</strong> is due for renewal on <strong>${billingDate}</strong>.</p>
          <p>Please ensure that your payment is completed by the due date to avoid any interruption in your service.</p>
          <p>If you have already made the payment, please disregard this email.</p>
          <p>Thank you for being a valued customer.</p>
          <p>Best regards,<br/>
          ${serviceName}</p>`,
  });
};

//Calendar Notification
const createCalendarEvent = async (
  emailObj: string,
  serviceUrl: string,
  billingDate: any,
) => {
  let clientId = process.env.GOOGLE_CLIENT_ID;
  let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  let refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  let spliturl = serviceUrl.split('.');
  let serviceName = spliturl[1];

  const calendarUser = emailObj.split('@');
  const calendarUserName = calendarUser[0];

  const { OAuth2 } = google.auth;
  const oAuth2Client = new OAuth2(clientId, clientSecret);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  const now = new Date();
  const startTime = now;
  const endTime = new Date(startTime.getTime() + 5 * 60 * 1000);

  const event = {
    summary: 'Subscription Renewal Reminder',
    description: `Hi ${calendarUserName}, This is a reminder that your subscription with ${serviceName} is renewing soon on ${billingDate}.`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    attendees: [{ email: emailObj }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: process.env.CALENDAR_EMAIL_NOTIFICATION },
        { method: 'popup', minutes: process.env.CALENDAR_EMAIL_POPUP },
      ],
    },
  };

  try {
    //@ts-ignore
    calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      sendUpdates: 'all',
    });
  } catch (error) {
    console.error('Error creating event or sending email:', error);
  }
};
