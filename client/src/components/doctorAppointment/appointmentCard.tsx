import { Calendar, Clock, Mail, Phone, User } from "lucide-react";
import { DateTime } from "luxon";

type AppointmentType = {
  appointment_id: number;
  appointment_date: string;
  patient_id: number;
  start_time: string;
  end_time: string;
  patient_time_zone: string;
  status: string;
  user: {
    name: string;
    email: string;
    phone_number: string;
  };
};

type Props = {
  appointment: AppointmentType;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  getStatusColor: (status: string) => string;
  formatTime: (date: string, time: string, zone: string) => string;
};

const AppointmentCard = ({ appointment, onAccept, onReject, getStatusColor, formatTime }: Props) => {
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
          <Calendar className="h-5 w-5" /> Date:{" "}
          {appointment?.appointment_date
            ? DateTime.fromISO(appointment.appointment_date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
            : "Invalid Date"}
        </p>
        <p className="flex gap-2 text-blue-700 font-semibold items-center">
          <Clock className="h-5 w-5" />
          {formatTime(appointment.appointment_date, appointment.start_time, appointment.patient_time_zone).replace(/\s[A-Z]{2,5}.*/, "")}{" "} -{" "}
          {formatTime(appointment.appointment_date, appointment.end_time, appointment.patient_time_zone)}
        </p>
      </div>

      <div className="flex flex-col sm:mt-4">
        <div className={`px-3 py-1 mt-4 sm:mt-0 text-white rounded-lg ${getStatusColor(appointment.status)} self-start inline-flex gap-2`}>
          <p>Status:</p>
          <p className="font-sans font-semibold">{appointment.status.toUpperCase()}</p>
        </div>

        {appointment?.status?.toLowerCase() === "pending" && (
          <div className="flex flex-wrap gap-2 sm:mt-4 self-start">
            <button className="bg-green-700 text-white px-8 py-2 rounded-full hover:bg-green-800 transition text-sm sm:text-base w-full sm:w-auto" onClick={() => onAccept(appointment.appointment_id)}>
              Accept
            </button>
            <button className="bg-red-600 text-white px-8 py-2 rounded-full hover:bg-red-700 transition text-sm sm:text-base w-full sm:w-auto" onClick={() => onReject(appointment.appointment_id)}>
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
