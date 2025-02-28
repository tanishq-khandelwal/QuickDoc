import { Request, Response } from "express";
import { apolloClient } from "../config/hasuraClient.ts";
import { GET_APPOINTMENTS_DETAILS } from "../queries/UserQueries.ts";
import sendEmail from "../utils/sendEmail.ts";
import { createEvent } from "ics";
import { DateTime } from "luxon";

export const Meeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid appointment ID" });
      return;
    }

    const result = await apolloClient.query({
      query: GET_APPOINTMENTS_DETAILS,
      variables: { id },
      fetchPolicy: "network-only",
    });

    if (!result.data || !result.data.appointments.length) {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
      return;
    }

    const appointment = result.data.appointments[0];
    const patient = appointment.user;
    const doctor = appointment.doctor.user;
    const timeZone = "Asia/Kolkata";

    const eventStart = DateTime.fromISO(
      `${appointment.appointment_date}T${appointment.start_time}`,
      { zone: timeZone }
    ).toUTC();
    const eventEnd = DateTime.fromISO(
      `${appointment.appointment_date}T${appointment.end_time}`,
      { zone: timeZone }
    ).toUTC();

    const meetingLink = `https://meet.jit.si/doctor_appointment_${id}`;

    // Create ICS event with necessary headers
    const event = {
      start: [
        eventStart.year,
        eventStart.month,
        eventStart.day,
        eventStart.hour,
        eventStart.minute,
      ],
      end: [
        eventEnd.year,
        eventEnd.month,
        eventEnd.day,
        eventEnd.hour,
        eventEnd.minute,
      ],
      startInputType: "utc",
      endInputType: "utc",
      title: `Appointment with ${patient.name}`,
      description: `Your appointment with ${patient.name} is scheduled. Meeting Link: ${meetingLink}`,
      location: "Online Meeting",
      url: meetingLink,
      organizer: {
        name: "MedVault",
        email: process.env.ORGANIZER_EMAIL || "organizer@medvault.com",
      },
    };

    createEvent(event, async (error, icsFile) => {
      if (error) {
        console.error("Error creating ICS file:", error);
        res.status(500).json({
          success: false,
          message: "Failed to generate calendar event",
        });
        return;
      }

      const icsContent = `

  BEGIN:VCALENDAR
  METHOD:REQUEST
  VERSION:2.0
  PRODID:-//MedVault//EN
  
  ${icsFile.replace(
    "END:VCALENDAR",
    `UID:appointment-${id}@medvault.com\nEND:VCALENDAR`
  )}
  `;

      const icsBuffer = Buffer.from(icsContent, "utf-8");

      // Email contents
      const patientSubject = "Your Appointment Details";
      const patientMessage = `
      <b>Dear ${patient.name},</b><br><br>
      Your appointment with Dr. ${doctor.name} is scheduled on <b>${appointment.appointment_date}</b>.<br>
      <b>Time:</b> ${appointment.start_time} - ${appointment.end_time} (IST)<br><br>
      <b>Meeting Link:</b> <a href="${meetingLink}">${meetingLink}</a><br><br>
      Click the attachment to add this event to your calendar.<br><br>
      Warm regards,<br>Quick Doc
      `;

      const doctorSubject = "Upcoming Appointment with a Patient";
      const doctorMessage = `
      <b>Dear Dr. ${doctor.name},</b><br><br>
      You have an upcoming appointment with <b>${patient.name}</b>.<br>
      <b>Date:</b> ${appointment.appointment_date}<br>
      <b>Time:</b> ${appointment.start_time} - ${appointment.end_time} (IST)<br><br>
      <b>Meeting Link:</b> <a href="${meetingLink}">${meetingLink}</a><br><br>
      Click the attachment to add this event to your calendar.<br><br>
      Best regards,<br>Quick Doc Team
      `;

      try {
        // Send emails
        await Promise.all([
          sendEmail(patient.email, patientSubject, patientMessage, icsBuffer),
          sendEmail(doctor.email, doctorSubject, doctorMessage, icsBuffer),
        ]);

        res.status(200).json({
          success: true,
          message: `Appointment details sent to ${patient.email} and ${doctor.email} successfully`,
        });
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
        res.status(500).json({
          success: false,
          message: "Failed to send appointment emails",
        });
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
