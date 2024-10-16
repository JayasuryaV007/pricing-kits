import 'server-only';

interface SendEmailParams {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export default async function sendEmail(config: SendEmailParams) {
  const transporter = await getSMTPTransporter();

  return transporter.sendMail(config);
}

/**
 * @description SMTP Transporter for production use. Add your favorite email
 * API details (Mailgun, Sendgrid, etc.) to the configuration.
 */
async function getSMTPTransporter() {
  const nodemailer = await import('nodemailer');

  return nodemailer.createTransport(getSMTPConfiguration());
}

function getSMTPConfiguration() {
  const user = process.env.MAILER_EMAIL_USER;
  const pass = process.env.MAILER_EMAIL_PASS;
  const host = process.env.ETHEREAL_HOST;
  const port = Number(process.env.ETHEREAL_PORT);
  const secure = process.env.EMAIL_TLS !== 'false';
  //const secure = port === 465;

  // validate that we have all the required configuration
  if (!user || !pass || !host || !port) {
    throw new Error(
      `Missing email configuration. Please add the following environment variables:
      MAILER_EMAIL_USER
      MAILER_EMAIL_PASS
      ETHEREAL_HOST
      ETHEREAL_PORT
      `,
    );
  }

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  };
}
