const cron = require('node-cron');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.development' }); // Load environment variables
const axios = require('axios');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { google } = require('googleapis');
const http = require('http');
const moment = require('moment');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const cronEnable = process.env.SEND_NOTIFICATION;
const supabase = createClient(supabaseUrl, supabaseKey);
const cronSchedule = process.env.CRON_SCHEDULE || '* * * * *'; // Default to every minute if not set

let clientId = process.env.GOOGLE_CLIENT_ID;
let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
let refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

cron.schedule(cronSchedule, async () => {
  if (cronEnable == 'yes') {
    console.log('cron is running .......');
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('status', 'Active'); // Fetches the 'id' column for all rows
      if (error) {
        throw error;
      }
      // Ensure data is not undefined and iterate over it
      if (data) {
        //let calendarEmailObj = [];
        let userAppData = null;
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

            userAppData = appData;

            if (userError) {
              console.error('Error fetching user data:', userError.message);
            } else {
              if (
                userAppData != null &&
                userAppData.slack_notification &&
                userAppData.slack_notification != null &&
                userAppData.slack_notification != ''
              ) {
                const webHookUrl = userAppData.webhook_url;
                sendNotification(userData, serviceUrl, billingDate, webHookUrl);
              }
              if (userAppData != null && userAppData.email_notification) {
                sendMailNotification(userData, serviceUrl, billingDate);
              }
              //Calendar event function
              if (userAppData != null && userAppData.calendar_notification) {
                let email = userData.email;
                createCalendarEvent(email, serviceUrl, billingDate);
              }
            }
            // let emailObj = { email: userData.email,"service_url":serviceUrl,"billingDate":billingDate };
            // calendarEmailObj.push(emailObj);
          }
        }
        //Calendar event function
        // if (calendarEmailObj.length > 0) {
        //   console.log("OOOOOOOOOOOOOSSSSSS", userAppData.calendar_notification)
        //   if(userAppData !=null && userAppData.calendar_notification){
        //     console.log("OOOOOOOOOOOOO", userAppData.calendar_notification)
        //     createCalendarEvent(calendarEmailObj,);
        //   }
        // }
      }
    } catch (error) {
      console.log('Cron disabled');
      console.error('Error fetching data:', error.message);
    }
  }
});

//Send Slack Notification
const sendNotification = async (
  userData,
  serviceUrl,
  billingDate,
  webhook_url,
) => {
  const email = userData.email;

  if (!serviceUrl) {
    console.error('Service URL is undefined for the user:', data);
    return; // Exit the function if serviceUrl is undefined
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
const sendMailNotification = async (userData, serviceUrl, billingDate) => {
  const email = userData.email;
  const myArray = email.split('@');
  const emailUserName = myArray[0];
  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.ETHEREAL_HOST,
    port: process.env.ETHEREAL_PORT,
    secure: false,
    auth: {
      user: process.env.MAILER_EMAIL_USER, // generated ethereal user
      pass: process.env.MAILER_EMAIL_PASS, // generated ethereal password
    },
  });

  let spliturl = serviceUrl.split('.');
  let serviceName = spliturl[1];
  // Send an email
  const info = await transporter.sendMail({
    from: process.env.FROM_ACCOUNT, // sender address
    to: userData.email, // list of receivers account
    subject: 'Payment Reminder: Subscription Renewal', //subject line
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
const createCalendarEvent = async (emailObj, serviceUrl, billingDate) => {
  let spliturl = serviceUrl.split('.');
  let serviceName = spliturl[1];

  const calenderUser = emailObj.split('@');
  const calendarUserName = calenderUser[0];

  // Create OAuth2 client
  const { OAuth2 } = google.auth;
  const oAuth2Client = new OAuth2(clientId, clientSecret);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  // Create Google Calendar API instance
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  // Get current time
  const now = new Date();
  const startTime = now; // Start time in 15 minutes
  const endTime = new Date(startTime.getTime() + 5 * 60 * 1000); // End time 15 minutes after start time

  const existingEvents = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startTime.toISOString(),
    timeMax: endTime.toISOString(),
    q: 'Test Notification1', // Assuming you search by summary
    singleEvents: true,
  });
  const event = {
    summary: 'Subscription Renewal Reminder',
    description: `Hi ${calendarUserName} This is a reminder that your subscription with ${serviceName} is renewing soon on ${billingDate}.`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'Asia/Kolkata', // Indian Standard Time (IST)
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'Asia/Kolkata', // Indian Standard Time (IST)
    },
    attendees: [{ email: emailObj }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: process.env.CALENDAR_EMAIL_NOTIFICATION }, // Email reminder 1 day before
        { method: 'popup', minutes: process.env.CALENDAR_EMAIL_POPUP }, // Popup reminder 10 minutes before
      ],
    },
  };

  try {
    // Insert the event
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      sendUpdates: 'all', // Send email notifications to all attendees
    });

    const eventLink = response.data.htmlLink;
  } catch (error) {
    console.error('Error creating event or sending email:', error);
  }
};
