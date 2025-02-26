import { Request, Response } from "express";
import { apolloClient } from "../config/hasuraClient.ts";
import { GET_APPOINTMENTS_DETAILS } from "../queries/UserQueries.ts";
import sendEmail from "../utils/sendEmail.ts";

export const RejectAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: "Invalid appointment ID" });
            return;
        }

        // Fetch appointment details
        const result = await apolloClient.query({
            query: GET_APPOINTMENTS_DETAILS,
            variables: { id },
            fetchPolicy: "network-only",
        });

        if (!result.data || !result.data.appointments.length) {
            res.status(404).json({ success: false, message: "Appointment not found" });
            return;
        }

        const appointment = result.data.appointments[0];
        const patient = appointment.user;
        const doctor = appointment.doctor.user;

        // **Patient Rejection Email Content**
        const subject = "Your Appointment Has Been Rejected";
        const message = `
            <b>Dear ${patient.name},</b><br><br>
            We regret to inform you that your appointment with <b>Dr. ${doctor.name}</b> on <b>${appointment.appointment_date}</b> 
            at <b>${appointment.start_time} (IST)</b> has been <span style="color:red;"><b>rejected</b></span>.<br><br>

            The amount deducted for this appointment will be <b>refunded within 24 hours</b>.<br><br>

            If you have any questions, please contact us.<br><br>

            Warm regards,<br>
            Quick Doc Team
        `;

        // Send the rejection email to the patient
        await sendEmail(patient.email, subject, message);

        res.status(200).json({
            success: true,
            message: `Rejection email sent to ${patient.email} successfully.`,
        });
    } catch (error) {
        console.error("Error sending rejection email:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
