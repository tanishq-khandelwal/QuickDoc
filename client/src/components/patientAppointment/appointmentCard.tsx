import { Clipboard, Calendar, Clock, Phone, User, Video } from "lucide-react";
import { DateTime } from "luxon";
import { formatTime, generateMeetingLink } from "./helper";
import { useMemo } from "react";
import { Appointment } from "@/containers/patient/types";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-600";
    case "approved":
      return "bg-green-600";
    case "rejected":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  console.log("Appointment", appointment);

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
  }, [appointment]);

  const formattedEndTime = useMemo(() => {
    return formatTime(
      appointment.appointment_date,
      appointment.end_time,
      appointment.patient_time_zone
    );
  }, [appointment]);

  return (
    <div className="bg-white mt-3 border shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start hover:shadow-xl transition">
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gray-400 border border-gray-300 rounded-full">
        <User size={56} className="text-white" />
      </div>

      <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Clipboard className="h-5 w-5" /> Dr {appointment?.doctor?.user?.name}
        </h2>
        <p className="text-gray-600 flex items-center gap-2 text-sm sm:text-base">
          <Phone className="h-5 w-5" />{" "}
          {appointment?.doctor?.user?.phone_number}
        </p>
        <p className="text-red-600 flex items-center gap-2 font-semibold text-sm sm:text-base">
          <Calendar className="h-5 w-5" /> Date: {appointmentDate}
        </p>
        <p className="text-blue-700 flex items-center gap-2 font-semibold text-sm sm:text-base">
          <Clock className="h-5 w-5" />
          {formattedStartTime} - {formattedEndTime}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div
          className={`px-3 py-1 mt-4 sm:mt-0 text-white text-center rounded-lg ${getStatusColor(
            appointment.status
          )} text-xs sm:text-sm font-semibold`}
        >
          {appointment.status.toUpperCase()}
        </div>

        <div>
          {appointment.status.toLowerCase() === "approved" && (
            <a
              href={generateMeetingLink(appointment.appointment_id.toString())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 bg-gray-600 text-white px-4 py-2 sm:mt-0 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition"
            >
              <div>
                <Video />
              </div>
              Join Meeting
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
