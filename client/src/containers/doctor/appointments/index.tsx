import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, updateApppointment } from "./actions";
import toast from "react-hot-toast";
import { DateTime } from "luxon";
import AppointmentCard from "@/components/doctorAppointment/appointmentCard";
import StatusFilter from "@/components/patientAppointment/statusFilter";

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

const AppointmentsContainer = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: any) => state.allAppointments
  );

  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const formatTime = (date: string, time: string, patientTimeZone: string) => {
    const local = DateTime.local();
    const systemZone = local.zoneName || "";

    const timeInPatientTZ = DateTime.fromISO(`${date}T${time}`, {
      zone: patientTimeZone,
    });
    const timeInUTC = timeInPatientTZ.toUTC();
    const localTime = timeInUTC.setZone(systemZone);

    return systemZone === "Asia/Calcutta"
      ? localTime.toFormat("hh:mm a 'IST'")
      : localTime.toFormat("hh:mm a ZZZZ");
  };

  const userData = localStorage.getItem("user");
  const doctorId = userData ? JSON.parse(userData).doctorId : null;

  useEffect(() => {
    dispatch(fetchAppointments(doctorId));
  }, [dispatch]);

  useEffect(() => {
    if (data?.data?.appointments) {
      setAppointments(data.data.appointments);
    }
  }, [data]);

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
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.appointment_id === appointmentId
          ? { ...appointment, status: "approved" }
          : appointment
      )
    );
  };

  const handleReject = (appointmentId: number) => {
    dispatch(updateApppointment({ appointmentId, status: "rejected" }));
    toast.error("Appointment Rejected");
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.appointment_id === appointmentId
          ? { ...appointment, status: "rejected" }
          : appointment
      )
    );
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

  const filteredAppointments =
    selectedStatus === "all"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status.toLowerCase() === selectedStatus
        );

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        <StatusFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>
      <div className="sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.appointment_id}
            appointment={appointment}
            onAccept={handleAccept}
            onReject={handleReject}
            getStatusColor={getStatusColor}
            formatTime={formatTime}
          />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsContainer;
