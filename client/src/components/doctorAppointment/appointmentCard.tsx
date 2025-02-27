import { Calendar, Clock, Mail, Phone, User, Video } from "lucide-react";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { generateMeetingLink } from "../patientAppointment/helper";
import { appointmentCardProps } from "./types";

const role = localStorage.getItem("role");

const AppointmentCard = ({
  appointment,
  onAccept,
  onReject,
  getStatusColor,
  formatTime,
}: appointmentCardProps) => {
  const appointmentDate = useMemo(() => {
    return appointment?.appointment_date
      ? DateTime.fromISO(appointment.appointment_date).toLocaleString(
          DateTime.DATE_MED_WITH_WEEKDAY
        )
      : "Invalid Date";
  }, [appointment?.appointment_date]);

  const formattedStartTime = useMemo(() => {
    return formatTime(
      appointment.appointment_date,
      appointment.start_time,
      appointment.patient_time_zone
    ).replace(/\s[A-Z]{2,5}.*/, "");
  }, [
    appointment.appointment_date,
    appointment.start_time,
    appointment.patient_time_zone,
  ]);

  const formattedEndTime = useMemo(() => {
    return formatTime(
      appointment.appointment_date,
      appointment.end_time,
      appointment.patient_time_zone
    );
  }, [
    appointment.appointment_date,
    appointment.end_time,
    appointment.patient_time_zone,
  ]);

  return (
    <div className="bg-white mt-3 border shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start hover:shadow-xl transition">
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gray-400 border border-gray-300 rounded-full">
        <User size={62} className="text-white" />
      </div>

      <div className="flex-1 ml-4">
        <p className="text-lg font-semibold">{appointment?.user?.name}</p>
        <p className="text-lg text-gray-600 flex gap-2 items-center">
          <Mail className="h-5 w-5" /> {appointment?.user?.email}
        </p>
        <h2 className="text-lg text-gray-600 flex gap-2 items-center">
          <Phone className="h-5 w-5" /> {appointment?.user?.phone_number}
        </h2>
        <p className="text-red-600 font-semibold flex gap-2 items-center">
          <Calendar className="h-5 w-5" /> Date: {appointmentDate}
        </p>
        <p className="flex gap-2 text-blue-700 font-semibold items-center">
          <Clock className="h-5 w-5" />
          {formattedStartTime} - {formattedEndTime}
        </p>
      </div>

      <div className="flex flex-col sm:mt-4">
        <div>
          <div
            className={`px-3 py-1 mt-4 sm:mt-0 text-white rounded-lg ${getStatusColor(
              appointment.status
            )} self-start inline-flex gap-2`}
          >
            <p>Status:</p>
            <p className="font-sans font-semibold">
              {appointment.status.toUpperCase()}
            </p>
          </div>
          <div>
            {appointment?.status?.toLowerCase() === "approved" && (
              <div className="mt-4">
                <a
                  href={generateMeetingLink(
                    appointment.appointment_id.toString()
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 bg-gray-600 text-white px-4 py-2 sm:mt-0 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition"
                >
                  <div>
                    <Video />
                  </div>
                  Join Meeting
                </a>
              </div>
            )}
          </div>
        </div>

        {appointment?.status?.toLowerCase() === "pending" && (
          <div className="flex flex-wrap gap-2 sm:mt-4 self-start">
            <button
              disabled={role === "guestdoctor"}
              className={`bg-green-700 text-white px-8 py-2 rounded-full transition text-sm sm:text-base w-full sm:w-auto ${
                role === "guestdoctor"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-800"
              }`}
              onClick={() => onAccept(appointment.appointment_id)}
            >
              Accept
            </button>
            <button
              disabled={role === "guestdoctor"}
              className={`bg-red-600 text-white px-8 py-2 rounded-full transition text-sm sm:text-base w-full sm:w-auto ${
                role === "guestdoctor"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-700"
              }`}
              onClick={() => onReject(appointment.appointment_id)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
