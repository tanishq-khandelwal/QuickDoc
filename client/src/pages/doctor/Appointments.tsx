import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { fetchAppointments } from "@/redux/actions/doctor/appointmentAction";
import { User } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Appointments = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: any) => state.allAppointments
  );
  const appointments = data?.data?.appointments;

  console.log(appointments);
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading appointments...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) toast.error(`Loading failed: ${error}`);
    }
  }, [loading, error]);

  const handleAccept = (id: string) => {
    // Dispatch accept action
    dispatch({ type: "ACCEPT_APPOINTMENT", payload: id });
    toast.success("Appointment accepted!");
  };

  const handleReject = (id: string) => {
    // Dispatch reject action
    dispatch({ type: "REJECT_APPOINTMENT", payload: id });
    toast.error("Appointment rejected!");
  };

  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        <div className="flex  gap-4 flex-wrap">
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment: any) => (
              <div
                key={appointment.appointment_id}
                className="bg-white border-2 shadow-md rounded-lg p-6 flex w-full cursor-pointer hover:shadow-xl"
              >
                <div className="h-24 w-24 px-8 flex items-center bg-gray-400 border-gray-300 border-1 rounded-full">
                  <User size={62} className="text-white" />
                </div>

                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">
                    {appointment?.user?.name}
                  </h2>
                  <p className="text-gray-600">
                    Date: {appointment?.appointment_date}
                  </p>
                  <p className="text-gray-600">
                    Time: {appointment.start_time} - {appointment.end_time}
                  </p>
                </div>

                {/* <div>
                <p className="text-gray-600">Status: {appointment.status}</p>
                </div> */}

                <div className="flex flex-col gap-2 mt-2">
                  <button
                    className="bg-green-700 text-white px-8 py-2 rounded-md"
                    onClick={() => handleAccept(appointment.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-600 text-white px-8 py-2 rounded-md"
                    onClick={() => handleReject(appointment.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No appointments found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
