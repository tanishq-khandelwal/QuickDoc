import { Request, Response } from "express";
import { apolloClient } from "../config/hasuraClient.ts";
import { GET_APPOINTMENTS_DETAILS } from "../queries/UserQueries.ts";
import sendEmail from "../utils/sendEmail.ts";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { formatInTimeZone } from "date-fns-tz";

export const Meeting = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid appointment ID" });
        return;
      }
  
      const result = await apolloClient.query({
        query: GET_APPOINTMENTS_DETAILS,
        variables: { id },
        fetchPolicy: "network-only",
      });
  
      if (!result.data || !result.data.appointments.length) {
        res.status(404).json({ success: false, message: "Appointment not found" });
        return;
      }
  
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const filePath = path.join(__dirname, `appointment-${id}.ics`);
  
      const appointment = result.data.appointments[0];
      const patient = appointment.user;
      const doctor = appointment.doctor.user;
  
      const timeZone = "Asia/Kolkata";
  
      // Format event start and end time
      const eventStart = formatInTimeZone(
        `${appointment.appointment_date}T${appointment.start_time}`,
        timeZone,
        "yyyyMMdd'T'HHmmss"
      );
      const eventEnd = formatInTimeZone(
        `${appointment.appointment_date}T${appointment.end_time}`,
        timeZone,
        "yyyyMMdd'T'HHmmss"
      );
  
      const meetingLink = `https://meet.jit.si/doctor_appointment_${id}`;
  
      // ICS Calendar Content
      const icsContent = `
  BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//MedVault//EN
  METHOD:PUBLISH
  BEGIN:VTIMEZONE
  TZID:Asia/Kolkata
  BEGIN:STANDARD
  DTSTART:19700101T000000
  TZOFFSETFROM:+0530
  TZOFFSETTO:+0530
  TZNAME:IST
  END:STANDARD
  END:VTIMEZONE
  BEGIN:VEVENT
  UID:${id}@medvault.com
  DTSTAMP:${formatInTimeZone(new Date(), timeZone, "yyyyMMdd'T'HHmmss")}
  DTSTART;TZID=Asia/Kolkata:${eventStart}
  DTEND;TZID=Asia/Kolkata:${eventEnd}
  SUMMARY:Appointment with ${patient.name}
  DESCRIPTION:Your appointment with ${patient.name} is scheduled. Meeting Link: ${meetingLink}
  LOCATION:Online Meeting
  URL:${meetingLink}
  ORGANIZER;CN=MedVault:mailto:organizer@medvault.com
  END:VEVENT
  END:VCALENDAR
  `;
  
      fs.writeFileSync(filePath, icsContent, "utf8");
  
      // **Patient Email Content**
      const patientSubject = "Your Appointment Details";
      const patientMessage = `
        <b>Dear ${patient.name},</b><br><br>
        Your appointment with Dr. ${doctor.name} is scheduled on <b>${appointment.appointment_date}</b>.<br>
        <b>Time:</b> ${appointment.start_time} - ${appointment.end_time} (IST)<br><br>
        
        <b>Meeting Link:</b> <a href="${meetingLink}">${meetingLink}</a><br><br>
        
        <a href="${meetingLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; 
        color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
        Join Meeting</a><br><br>
        
        Click the attachment to add this event to your calendar.<br><br>
        
        Warm regards,<br>
        Quick Doc
      `;
  
      // **Doctor Email Content**
      const doctorSubject = "Upcoming Appointment with a Patient";
      const doctorMessage = `
        <b>Dear Dr. ${doctor.name},</b><br><br>
        You have an upcoming appointment with <b>${patient.name}</b>.<br>
        <b>Date:</b> ${appointment.appointment_date}<br>
        <b>Time:</b> ${appointment.start_time} - ${appointment.end_time} (IST)<br><br>
        
        <b>Meeting Link:</b> <a href="${meetingLink}">${meetingLink}</a><br><br>
        
        <a href="${meetingLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; 
        color: #ffffff; background-color: #28a745; text-decoration: none; border-radius: 5px;">
        Join Meeting</a><br><br>
        
        Click the attachment to add this event to your calendar.<br><br>
        
        Best regards,<br>
        Quick Doc Team
      `;
  
      try {
        // Send different emails to the patient and doctor
        await Promise.all([
          sendEmail(patient.email, patientSubject, patientMessage, filePath),
          sendEmail(doctor.email, doctorSubject, doctorMessage, filePath),
        ]);
      } finally {
        // Ensure the ICS file is deleted
        fs.unlinkSync(filePath);
      }
  
      res.status(200).json({
        success: true,
        message: `Appointment details sent to ${patient.email} and ${doctor.email} successfully`,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  
