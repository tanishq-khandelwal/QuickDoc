import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const sendEmail = async (email: string, subject: string, message: string, icsBuffer?: Buffer) => {
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

    // Attach ICS file as buffer
    if (icsBuffer) {
      mailOptions.attachments = [
        {
          filename: "appointment.ics",
          content: icsBuffer,
          contentType: "text/calendar;charset=UTF-8; method=REQUEST",
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
