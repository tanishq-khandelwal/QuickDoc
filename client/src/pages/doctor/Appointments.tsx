import { useState, useEffect } from "react";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import {
  fetchAppointments,
  updateApppointment,
} from "@/redux/actions/doctor/appointmentAction";
import { Calendar, Clock, Mail, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";

const Appointments = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: any) => state.allAppointments
  );
  const appointments = Array.isArray(data?.data?.appointments)
    ? data.data.appointments
    : [];

  const [selectedStatus, setSelectedStatus] = useState("all");

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

  const handleAccept = (appointmentId: number) => {
    dispatch(updateApppointment({ appointmentId, status: "approved" }));
    toast.success("Appointment Accepted");
    setTimeout(() => window.location.reload(), 500);
  };

  const handleReject = (appointmentId: number) => {
    dispatch(updateApppointment({ appointmentId, status: "rejected" }));
    toast.error("Appointment Rejected");
    setTimeout(() => window.location.reload(), 500);
  };

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
  

  var local = DateTime.local(2017, 5, 15, 9, 10, 23);
  const systemZone = local.zoneName || "";

  const formatTime = (date: string, time: string, patientTimeZone: string) => {
    const localTime = DateTime.fromISO(`${date}T${time}`, { zone: patientTimeZone }).setZone(systemZone);
    
    if (systemZone === "Asia/Calcutta") {
      return localTime.toFormat("hh:mm a 'IST'");
    } else {
      return localTime.toFormat("hh:mm a ZZZZ"); 
    }
  };  

  const filteredAppointments =
    selectedStatus === "all"
      ? appointments
      : appointments.filter(
          (appointment:AppointmentType) => appointment.status.toLowerCase() === selectedStatus
        );

  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto p-4 mt-20">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">Appointments</h1>
          </div>

          <div className="mb-4">
            <label className="mr-2 font-semibold">Filter by Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border px-3 py-2 rounded-md cursor-pointer"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment: any) => (
              <div
                key={appointment.appointment_id}
                className="bg-white border-2 shadow-md rounded-lg p-6 flex w-full cursor-pointer hover:shadow-xl"
              >
                <div className="h-24 w-24 px-8 flex items-center bg-gray-400 border-gray-300 border-1 rounded-full">
                  <User size={62} className="text-white" />
                </div>

                <div className="flex-1 ml-4">
                  <p className="text-lg font-semibold">
                    {appointment?.user?.name}
                  </p>
                  <p className="text-lg text-gray-600 flex gap-2 items-center">
                    <Mail className="h-5 w-5" /> {appointment?.user?.email}
                  </p>
                  <h2 className="text-lg text-gray-600 flex gap-2 items-center">
                    <Phone className="h-5 w-5" />{" "}
                    {appointment?.user?.phone_number}
                  </h2>
                  <p className="text-red-600 font-semibold flex gap-2 items-center">
                    <Calendar className="h-5 w-5" /> Date:{" "}
                    {appointment?.appointment_date
                      ? DateTime.fromISO(
                          appointment.appointment_date
                        ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
                      : "Invalid Date"}
                  </p>
                  <p className="flex gap-2 text-blue-700 font-semibold items-center">
                    <Clock className="h-5 w-5" />
                    {formatTime(
                      appointment.appointment_date,
                      appointment.start_time,
                      appointment.patient_time_zone
                    )}{" "}
                    -
                    {formatTime(
                      appointment.appointment_date,
                      appointment.end_time,
                      appointment.patient_time_zone
                    )}
                  </p>
                </div>

                <div className="flex flex-col">
                  <div
                    className={`px-3 py-1 text-white rounded-lg ${getStatusColor(
                      appointment.status
                    )} self-start inline-flex gap-2`}
                  >
                    <p>Status:</p>
                    <p className="font-sans font-semibold">
                      {appointment.status.toUpperCase()}
                    </p>
                  </div>

                  {appointment.status.toLowerCase() === "pending" && (
                    <div className="flex gap-2 mt-auto">
                      <button
                        className="bg-green-700 text-white px-8 py-2 rounded-full"
                        onClick={() => handleAccept(appointment.appointment_id)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-600 text-white px-8 py-2 rounded-full"
                        onClick={() => handleReject(appointment.appointment_id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
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
