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

const DoctorPreview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorAvailabilty());
  }, [dispatch]);

  const { doctorAvailability, loading, error } = useSelector(
    (state: RootState) => state.availability
  );

  const data = doctorAvailability?.[0];

  const [availableDays, setAvailableDays] = useState<any[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]); // State to hold available time slots
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      const availability = await getUserAvailability(data);
      setAvailableDays(availability);
      console.log(availability); // Logs the correct value after fetching
    };

    if (data) {
      fetchAvailability();
    }
  }, [data]); // Dependency on `data` ensures fetch runs when `data` changes

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) toast.error(`Loading failed: ${error}`);
    }
  }, [loading, error]);

  // Calendar
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    // Generate available time slots when a day is selected
    const selectedDay = availableDays.find(
      (day) =>
        day.day.toLowerCase() ===
        selectedDate.toLocaleString("en-US", { weekday: "long" }).toLowerCase()
    );

    console.log(selectedDay); // Logs the correct value after selecting a day

    if (
      selectedDay &&
      selectedDay.available &&
      selectedDay.start_time &&
      selectedDay.end_time
    ) {
      const timeSlots = generateAvailableTimeSlots(
        new Date(`1970-01-01T${selectedDay.start_time}`), // Convert time to Date object
        new Date(`1970-01-01T${selectedDay.end_time}`), // Convert time to Date object
        15, // 15-minute slots (you can change this)
        selectedDate, // Pass the date string
        [] // Pass any existing bookings, if necessary
      );
      setAvailableTimeSlots(timeSlots);
      console.log(timeSlots); // Logs the correct value after generating
    }
  }, [selectedDate, availableDays]);

  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for accurate comparison
    const dayOfWeek = date
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
    const dayAvailability = availableDays.find((d) => d.day === dayOfWeek);

    // Disable the day if it's before today or unavailable
    return date < today || !dayAvailability?.available;
  };

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
            <div className="flex flex-col md:flex-row justify-center bg-white border-2 shadow-md rounded-lg p-6  w-full">
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
            </div>

            <div>
              <h2 className="text-xl font-semibold mt-6">
                Doctor's Availability
              </h2>
              <span className="text-gray-600 pt-2">
                Select the date and time slot to book an appointment
              </span>

              <div className="flex justify-around px-4 ">
                <div className="bg-white rounded-lg p-6  w-96">
                  <Calendar
                    mode="single"
                    className="mb-6 rounded-lg border p-4"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                    }}
                    disabled={disabledDays} // Disable unavailable days
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Available Time Slots
                  </h3>
                  {/* add hide scroll bar code */}
                  <div className="h-full w-full py-2 scrollbar-hide px-5">
                    {selectedDate && (
                      <div className="mb-4">
                        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                          {availableTimeSlots?.map((slot) => (
                            <Button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className="border-2 border-[#A6BAD0] bg-white text-[#0A2441] hover:bg-[#0067E7] hover:text-white"
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorPreview;
