import { Clipboard, Calendar, Clock, Phone, User } from "lucide-react";
import { DateTime } from "luxon";

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

const formatTime = (date: string, time: string, patientTimeZone: string) => {
  const local = DateTime.local();
  const systemZone = local.zoneName || "";

  const timeInPatientTZ = DateTime.fromISO(`${date}T${time}`, { zone: patientTimeZone });
  const timeInUTC = timeInPatientTZ.toUTC();
  const localTime = timeInUTC.setZone(systemZone);

  return systemZone === "Asia/Calcutta" ? localTime.toFormat("hh:mm a 'IST'") : localTime.toFormat("hh:mm a ZZZZ");
};

const AppointmentCard = ({ appointment }: { appointment: any }) => {
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
          <Phone className="h-5 w-5" /> {appointment?.doctor?.user?.phone_number}
        </p>
        <p className="text-red-600 flex items-center gap-2 font-semibold text-sm sm:text-base">
          <Calendar className="h-5 w-5" /> Date:{" "}
          {appointment?.appointment_date
            ? DateTime.fromISO(appointment.appointment_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
            : "Invalid Date"}
        </p>
        <p className="text-blue-700 flex items-center gap-2 font-semibold text-sm sm:text-base">
          <Clock className="h-5 w-5" />
          {formatTime(appointment.appointment_date, appointment.start_time, appointment.patient_time_zone).replace(/\s[A-Z]{2,5}.*/, "")}{" "} -{" "}
          {formatTime(appointment.appointment_date, appointment.end_time, appointment.patient_time_zone)}
        </p>
      </div>

      <div className={`px-3 py-1 mt-4 sm:mt-0 text-white rounded-lg ${getStatusColor(appointment.status)} text-xs sm:text-sm font-semibold`}>
        {appointment.status.toUpperCase()}
      </div>
    </div>
  );
};

export default AppointmentCard;
