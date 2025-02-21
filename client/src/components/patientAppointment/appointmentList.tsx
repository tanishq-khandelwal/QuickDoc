import AppointmentCard from "./appointmentCard";

const AppointmentList = ({ appointments }: { appointments: any[] }) => {
  return (
    <div className="sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {appointments.length > 0 ? (
        appointments.map((appointment) => <AppointmentCard key={appointment.appointment_id} appointment={appointment} />)
      ) : (
        <p className="text-center w-full text-gray-500 text-sm sm:text-base">No appointments found</p>
      )}
    </div>
  );
};

export default AppointmentList;
