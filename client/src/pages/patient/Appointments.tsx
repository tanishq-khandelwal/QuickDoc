import { useState, useEffect } from "react";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { fetchMyAppointments } from "@/redux/actions/patient/MyAppointmentAction";
import { Calendar, Clipboard, Clock, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";

const MyAppointments = () => {
  const dispatch = useDispatch();

  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).user_id : null;
  console.log(userId);

  useEffect(() => {
    dispatch(fetchMyAppointments(userId));
  }, [dispatch]);

  const { data, loading, error } = useSelector(
    (state: any) => state.myAppointments
  );
  const appointments = Array.isArray(data?.data?.appointments)
    ? data.data.appointments
    : [];

  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    if (loading) {
      toast.loading("Loading your appointments...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) toast.error(`Loading failed: ${error}`);
    }
  }, [loading, error]);

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

  var local = DateTime.local(2017, 5, 15, 9, 10, 23);
  const systemZone = local.zoneName || "";

  const formatTime = (date: string, time: string, patientTimeZone: string) => {
    const localTime = DateTime.fromISO(`${date}T${time}`, {
      zone: patientTimeZone,
    }).setZone(systemZone);

    // Check if the system timezone is India
    if (systemZone === "Asia/Calcutta") {
      return localTime.toFormat("hh:mm a 'IST'"); // Force IST label
    } else {
      return localTime.toFormat("hh:mm a ZZZZ"); // Show the correct timezone abbreviation
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
  // Filter appointments based on selected status
  const filteredAppointments =
    selectedStatus === "all"
      ? appointments
      : appointments.filter(
          (appointment: AppointmentType) =>
            appointment.status.toLowerCase() === selectedStatus
        );

  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto px-4 mt-16 sm:mt-24">
        {/* Header and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">My Appointments</h1>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-sm sm:text-base">
              Filter by Status:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border px-3 py-2 rounded-md cursor-pointer text-sm sm:text-base"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Appointments List */}
        <div className="sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment:any) => (
              <div
                key={appointment.appointment_id}
                className="bg-white mt-3 border shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start hover:shadow-xl transition"
              >
                {/* Doctor Avatar */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gray-400 border border-gray-300 rounded-full">
                  <User size={56} className="text-white" />
                </div>

                {/* Appointment Info */}
                <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Clipboard className="h-5 w-5" /> Dr{" "}
                    {appointment?.doctor?.user?.name}
                  </h2>
                  <p className="text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                    <Phone className="h-5 w-5" />{" "}
                    {appointment?.doctor?.user?.phone_number}
                  </p>
                  <p className="text-red-600 flex items-center gap-2 font-semibold text-sm sm:text-base">
                    <Calendar className="h-5 w-5" /> Date:{" "}
                    {appointment?.appointment_date
                      ? DateTime.fromISO(
                          appointment.appointment_date
                        ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
                      : "Invalid Date"}
                  </p>
                  <p className="text-blue-700 flex items-center gap-2 font-semibold text-sm sm:text-base">
                    <Clock className="h-5 w-5" />{" "}
                    {formatTime(
                      appointment.appointment_date,
                      appointment.start_time,
                      appointment.patient_time_zone
                    )}{" "}
                    -{" "}
                    {formatTime(
                      appointment.appointment_date,
                      appointment.end_time,
                      appointment.patient_time_zone
                    )}
                  </p>
                </div>

                {/* Status Badge */}
                <div
                  className={`px-3 py-1 mt-4 sm:mt-0 text-white rounded-lg ${getStatusColor(
                    appointment.status
                  )} text-xs sm:text-sm font-semibold`}
                >
                  {appointment.status.toUpperCase()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-500 text-sm sm:text-base">
              No appointments found
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyAppointments;
