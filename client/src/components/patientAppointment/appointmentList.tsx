import { map } from "lodash";
import AppointmentCard from "./appointmentCard";
import { AppointmentListProps } from "@/containers/patient/types";


const AppointmentList = ({ appointments }: AppointmentListProps) => {
  console.log(appointments);
  return (
    <div className="sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {appointments.length > 0 ? (
        map(appointments, (appointment) => (
          <AppointmentCard  appointment={appointment} />
        ))
      ) : (
        <p className="text-center w-full text-gray-500 text-sm sm:text-base">
          No appointments found
        </p>
      )}
    </div>
  );
};

export default AppointmentList;