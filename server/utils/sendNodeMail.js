import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_CONFIGS_EMAIL,
    pass: process.env.MAIL_CONFIGS_PASSWORD,
  },
});

export async function sendEmail(email, subject, content, attachments = [], bcc = [], options = {}) {
  const mailOptions = {
    from: process.env.MAIL_CONFIGS_EMAIL,
    to: email,
    subject: subject,
    html: content,
    attachments: attachments,
    bcc: bcc,
    ...options,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
