import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { fetchDoctorAvailabilty } from "@/redux/actions/patient/doctorAvailabiltyAction";
import { RootState } from "@/redux/rootReducer";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { User } from "lucide-react";
import {
  generateAvailableTimeSlots,
  getUserAvailability,
} from "@/helper/patient/availability";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { bookAppointment } from "@/redux/actions/patient/bookAppointmentAction";
import { DateTime } from "luxon";
import CheckoutButton from "@/stripe/checkoutForm";

const DoctorPreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = Number(searchParams.get("doctorId"));
  const userData = localStorage.getItem("user");
  const userId = JSON.parse(userData || "{}").user_id;
  // console.log(doctorId);

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchDoctorAvailabilty(doctorId)); // Pass doctorId as payload
    }
  }, [dispatch, doctorId]);

  const { doctorAvailability, loading, error } = useSelector(
    (state: RootState) => state.availability
  );

  const data = doctorAvailability?.[0];

  const [availableDays, setAvailableDays] = useState<any[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [exceptionAvailabilities, setExceptionAvailabilities] = useState<any[]>(
    []
  );

  const [Booked, setBooked] = useState(false);

  const formattedDate = new Date(selectedDate);
  formattedDate.setHours(0, 0, 0, 0); // Reset time to 00:00 to avoid time zone adjustments
  const finalformattedDate =
    selectedDate?.getFullYear() +
    "-" +
    (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    selectedDate.getDate().toString().padStart(2, "0");

  // console.log(finalformattedDate);
  const handleBookingAppointment = () => {
    const addMinutes = (time: string, minutes: number) => {
      const [hours, mins] = time?.split(":")?.map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(mins + minutes);

      return date?.toTimeString()?.split(" ")[0]?.slice(0, 5); // Formats back to "HH:MM"
    };

    const appointmentData = {
      doctorId: doctorId,
      appointmentDate: finalformattedDate,
      patientId: userId,
      startTime: selectedTime!,
      endTime: addMinutes(selectedTime!, data?.slot_duration),
    };

    sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData));

    // console.log(appointmentData);
    setBooked(true);
    // dispatch(bookAppointment(appointmentData));
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      const { availability, exceptionAvailabilities } =
        await getUserAvailability(data);
      setAvailableDays(availability);
      setExceptionAvailabilities(exceptionAvailabilities);
      console.log("Calendar Availability", availability);
      console.log("Exception Availiobilty", exceptionAvailabilities);
    };

    if (data) {
      fetchAvailability();
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) toast.error(`Loading failed: ${error}`);
    }
  }, [loading, error]);

  const { isloading, iserror, appointment } = useSelector(
    (state: RootState) => state.bookAppointment
  );

  useEffect(() => {
    if (isloading && Booked) {
      toast.loading("Booking Appointment...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (iserror) {
        toast.error(`Booking failed: ${error}`);
      } else if (appointment && Booked) {
        toast.success("Appointment booked successfully!");
        navigate("/");
      }
    }
  }, [isloading, iserror, appointment]);

  // Calendar
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const formattedDate = DateTime.fromJSDate(selectedDate).toISODate() || "";
    console.log("Formatted Date", formattedDate);
    // Check if the selected date is an exception date
    const exceptionDay = exceptionAvailabilities.find(
      (e) => e.date === formattedDate
    );

    if (exceptionDay) {
      if (exceptionDay.available) {
        // Generate time slots based on exception timing
        const timeSlots = generateAvailableTimeSlots(
          exceptionDay.start_time,
          exceptionDay.end_time,
          data?.slot_duration,
          formattedDate,
          exceptionDay.time_zone,
          data?.appointments
        );
        setAvailableTimeSlots(timeSlots);
      } else {
        setAvailableTimeSlots([]); // If unavailable, set no slots
      }
      return;
    }

    // Fallback to regular availability if no exception exists
    const selectedDay = availableDays.find(
      (day) =>
        day.day.toLowerCase() ===
        selectedDate.toLocaleString("en-US", { weekday: "long" }).toLowerCase()
    );

    if (selectedDay && selectedDay.available) {
      const timeSlots = generateAvailableTimeSlots(
        selectedDay.start_time,
        selectedDay.end_time,
        data?.slot_duration,
        formattedDate,
        selectedDay.time_zone,
        data?.appointments
      );
      setAvailableTimeSlots(timeSlots);
    }
  }, [selectedDate, availableDays, exceptionAvailabilities]);

  console.log("Selected Date is:", selectedDate);

  const disabledDays = (date: Date) => {
    const today = DateTime.local().startOf("day"); // Ensures time is 00:00
    const formattedDate = DateTime.fromJSDate(date).toISODate(); // Convert to "YYYY-MM-DD"

    // Check if the date exists in exception availabilities
    const exceptionDay = exceptionAvailabilities.find(
      (e) => e.date === formattedDate
    );

    if (exceptionDay) {
      return !exceptionDay.available; // If exception exists, return its availability
    }

    // Check if the date falls under regular weekly availability
    const dayOfWeek = date
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
    const dayAvailability = availableDays.find((d) => d.day === dayOfWeek);

    return DateTime.fromJSDate(date) < today || !dayAvailability?.available;
  };

  // console.log(availableDays);

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen pt-24 px-6 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <h1 className="text-2xl font-semibold"> </h1>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-8">Error: {error}</div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-center bg-white border-2 shadow-md rounded-lg p-4 sm:p-6  w-full">
              <div className="w-28 h-28 flex justify-center items-center bg-gray-400 border border-gray-300 rounded-full">
                <User size={40} className="text-white" />
              </div>

              <div className="flex-1 ml-4">
                <h2 className="font-bold text-xl text-indigo-600">
                  {data?.user?.name || "Unknown Doctor"}
                </h2>
                <p className="text-gray-600 mt-1">
                  Specialization: {data?.specialization || "N/A"}
                </p>
                <p className="text-gray-600 mt-1">
                  Experience: {data?.experience_years || 0} years
                </p>
                <p className="text-gray-600 mt-1">
                  City: {data?.city || "Unknown"}
                </p>
                <p className="text-gray-600 mt-1">
                  Clinic Address: {data?.clinic_address || "Not Available"}
                </p>
              </div>

              <div className="text-gray-600 mt-4 md:mt-0 justify-center items-center">
                <div className="flex gap-2">
                  <p className="text-sm">Consultation Fee :</p>
                  <p className="text-medium font-semibold  text-green-700">
                    ₹{data?.consultation_fee || 0}
                  </p>
                </div>

                <div className="flex gap-2">
                  <p className="text-sm">Slot Duration:</p>
                  <p className="text-sm text-red-700">
                    {data?.slot_duration} minutes
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold mt-6">
                    Doctor's Availability
                  </h2>
                  <span className="text-gray-600 pt-2">
                    Select the date and time slot to book an appointment
                  </span>
                </div>
              </div>

              <div className="flex justify-around px-4 ">
                <div className="bg-white rounded-lg p-6  w-96">
                  <Calendar
                    mode="single"
                    className="mb-6 rounded-lg border p-4"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date ?? new Date());
                    }}
                    disabled={disabledDays} // Disable unavailable days
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Available Time Slots
                  </h3>
                  {/* add hide scroll bar code */}
                  <div className="h-full w-full py-2 px-5 overflow-y-auto max-h-[40vh] scrollbar-hide lg:overflow-visible">
                    {selectedDate && (
                      <div className="mb-4">
                        {availableTimeSlots?.length > 0 ? (
                          <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                            {availableTimeSlots.map((slot) => (
                              <Button
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                className={`border-2 ${
                                  selectedTime === slot
                                    ? "bg-[#0067E7] text-white shadow-xl"
                                    : "bg-[#F2F8FF] text-[#0067E7] border-[#0169FE]"
                                } hover:bg-[#0067E7] hover:text-white`}
                              >
                                {slot}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <p className="flex items-center justify-center text-center text-red-500">
                            No time slots available for this day
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                {selectedTime && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2 text-lg font-medium mb-2">
                      Click to Book Appointment for{" "}
                      <div className="text-red-600">
                        {selectedDate?.toLocaleDateString()}
                      </div>{" "}
                      at <div className="text-red-600">{selectedTime}</div>
                    </div>
                    {/* <Button
                      className="border-2 bg-[#0067E7] text-white shadow-xl hover:bg-[white] hover:text-[#0067E7] hover:border-[#0067E7]"
                      onClick={handleBookingAppointment}
                    >
                      Book Appointment
                    </Button> */}

                    <CheckoutButton
                      onSuccess={handleBookingAppointment}
                      price={data?.consultation_fee}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorPreview;
