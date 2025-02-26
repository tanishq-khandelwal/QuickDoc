import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import fs from "fs";

configDotenv();

const sendEmail = async (email: string, subject: string, message: string, attachmentPath?: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    let mailOptions: any = {
      from: process.env.SMTP_FROM_EMAIL || "noreply@example.com",
      to: email,
      subject: subject,
      html: message,
    };

    if (attachmentPath && fs.existsSync(attachmentPath)) {
      mailOptions.attachments = [
        {
          filename: "appointment.ics",
          path: attachmentPath,
          contentType: "text/calendar",
          contentDisposition: "attachment", 
        },
      ];
    }

    let info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
