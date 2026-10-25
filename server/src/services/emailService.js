const nodemailer = require('nodemailer');

let transporter = null;

const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpUser = process.env.SMTP_USER;
const smtpRawPass = process.env.SMTP_PASS || '';
const cleanPass = smtpRawPass.replace(/\s+/g, '');
const isSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

const isConfigured = Boolean(
  smtpHost &&
  smtpUser &&
  cleanPass &&
  smtpUser !== 'your-email@gmail.com' &&
  cleanPass !== 'your-google-app-password'
);

function formatSender(rawSender, userEmail) {
  if (!rawSender) {
    return userEmail ? `"vbrion" <${userEmail}>` : `"vbrion Portal" <notifications@vbrion.com>`;
  }
  if (/<[^>]+>/.test(rawSender)) {
    return rawSender;
  }
  const match = rawSender.match(/^(.*?)\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
  if (match) {
    const namePart = match[1].trim() || 'vbrion';
    const emailPart = match[2].trim();
    return `${namePart} <${emailPart}>`;
  }
  return rawSender;
}

if (isConfigured) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: smtpUser,
      pass: cleanPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verify connection on startup
  transporter.verify((error) => {
    if (error) {
      console.warn(`[EmailService] SMTP verification notice: ${error.message}`);
    } else {
      console.log(`[EmailService] SMTP connection verified successfully to ${smtpHost}:${smtpPort} as ${smtpUser}`);
    }
  });
} else {
  console.log('[EmailService] SMTP running in simulation mode. Configure SMTP_USER and SMTP_PASS in .env to dispatch live emails.');
}

/**
 * Verify current SMTP connection status
 */
async function verifySmtpConnection() {
  if (!transporter) {
    return {
      configured: false,
      message: 'SMTP credentials not configured or incomplete.'
    };
  }
  try {
    await transporter.verify();
    return {
      configured: true,
      connected: true,
      host: smtpHost,
      port: smtpPort,
      user: smtpUser
    };
  } catch (err) {
    return {
      configured: true,
      connected: false,
      error: err.message
    };
  }
}

/**
 * Send enquiry notification email
 */
async function sendEnquiryEmail({ name, email, phone, service, message }) {
  const recipient = process.env.COMPANY_EMAIL || process.env.CONTACT_EMAIL || 'info@vbrion.com';
  const sender = formatSender(process.env.SMTP_FROM, smtpUser);

  const mailOptions = {
    from: sender,
    to: recipient,
    replyTo: email,
    subject: `[New Client Enquiry] ${service} - from ${name}`,
    text: `
New client enquiry received via vbrion portfolio:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Interested: ${service}

Message:
${message}

---
Dispatched automatically by vbrion portfolio server.
    `,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0A1120; color: #C9D3E3; padding: 24px; border-radius: 8px;">
        <h2 style="color: #00D4FF; margin-top: 0;">New Client Enquiry — vbrion</h2>
        <div style="background-color: #101A2E; padding: 20px; border-radius: 6px; border: 1px solid rgba(0, 212, 255, 0.2);">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #00D4FF;">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service of Interest:</strong> <span style="background-color: #0B4C7A; color: #FFF; padding: 3px 8px; border-radius: 4px;">${service}</span></p>
          <hr style="border: 0; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 16px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #FFFFFF;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #8B97AD; margin-top: 16px;">This message was generated from the vbrion portfolio contact form and routed to ${recipient}.</p>
      </div>
    `,
  };

  if (!transporter) {
    console.log('[EmailService] SMTP in simulation mode. Email recorded for recipient:', recipient);
    console.log('[EmailService] Payload details:', { name, email, phone, service, messageLength: message ? message.length : 0 });
    return { simulated: true, success: true, recipient };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[EmailService] Message dispatched successfully via SMTP:', info.messageId);
    return { success: true, messageId: info.messageId, recipient };
  } catch (err) {
    console.error('[EmailService] Failed to send email via SMTP:', err.message);
    return { success: false, error: err.message, recipient };
  }
}

module.exports = {
  sendEnquiryEmail,
  verifySmtpConnection
};
