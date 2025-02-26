import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchMyAppointments } from "./actions";
import StatusFilter from "@/components/patientAppointment/statusFilter";
import AppointmentList from "@/components/patientAppointment/appointmentList";
import { Appointment, MyAppointmentsState } from "../types";


const MyAppointmentsContainer = () => {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).user_id : null;

  useEffect(() => {
    dispatch(fetchMyAppointments(userId));
  }, [dispatch, userId]);

  // Use the MyAppointmentsState interface for type safety
  const { data, loading, error } = useSelector((state: { myAppointments: MyAppointmentsState }) => state.myAppointments);
  const appointments = Array.isArray(data?.data?.appointments) ? data.data.appointments : [];

  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    if (loading) {
      toast.loading("Loading your appointments...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) toast.error(`Loading failed: ${error}`);
    }
  }, [loading, error]);

  const filteredAppointments =
    selectedStatus === "all"
      ? appointments
      : appointments.filter((appointment: Appointment) => appointment.status.toLowerCase() === selectedStatus);

  return (
    <div className="container mx-auto px-4 mt-16 sm:mt-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">My Appointments</h1>
        <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
      </div>
      <AppointmentList appointments={filteredAppointments} />
    </div>
  );
};

export default MyAppointmentsContainer;