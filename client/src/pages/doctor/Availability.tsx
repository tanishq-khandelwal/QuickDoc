import { useEffect, useState } from "react";
import Layout from "@/Layout";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailability } from "@/redux/actions/doctor/availabilityAction";
import { RootState } from "@/redux/rootReducer";
import toast from "react-hot-toast";
import AvailabilityModal from "@/components/AvailabilityModal";

interface AvailabilityDay {
  selected: boolean;
  startTime: string;
  endTime: string;
  openDropdown: string | null;
}

const Availability = () => {
  const weekDays = [
    { id: 1, title: "Sunday" },
    { id: 2, title: "Monday" },
    { id: 3, title: "Tuesday" },
    { id: 4, title: "Wednesday" },
    { id: 5, title: "Thursday" },
    { id: 6, title: "Friday" },
    { id: 7, title: "Saturday" },
  ];
  const timeSlots = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const [modifiedDays, setModifiedDays] = useState(new Set<number>());

  const convertTo24HourFormat = (time: string) => {
    if (!time) return "";
    const [hourMin, period] = time.split(" ");
    let [hours, minutes] = hourMin.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSave = () => {
    const savedData = weekDays
      .filter((day) => modifiedDays.has(day.id)) // Only log modified days
      .map((day) => ({
        day: day.title,
        start_time: convertTo24HourFormat(availability[day.id]?.startTime),
        end_time: convertTo24HourFormat(availability[day.id]?.endTime),
      }));

    console.log("Saved Availability:", savedData);
    setModifiedDays(new Set()); // Reset modified state after saving
  };

  const handleTimeChange = (
    dayId: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        [field]: value,
      },
    }));
    setModifiedDays((prev) => new Set(prev).add(dayId));
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const toggleDropdown = (id: number, field: string | null) => {
    // console.log("Toggling", id, field);
    setAvailability((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        openDropdown: prev[id].openDropdown === field ? null : field,
      },
    }));
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.doctoravailabilty
  );

  useEffect(() => {
    dispatch(fetchAvailability());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) toast.error(`Loading failed: ${error}`);
      if(data) toast.dismiss("loading");
    }
  }, [loading, error,data]);

  const [availability, setAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>({});

  useEffect(() => {
    if (data?.data?.doctor_availability) {
      const appointmentData = data.data.doctor_availability;
      setAvailability(
        weekDays.reduce((acc, day) => {
          const appointment = appointmentData.find(
            (appt: any) => appt.available_days === day.title
          );
          acc[day.id] = {
            selected: !!appointment,
            startTime: appointment
              ? formatTime(appointment.start_time)
              : "9:00 AM", // Set fetched time or default
            endTime: appointment ? formatTime(appointment.end_time) : "9:00 PM",
            openDropdown: null,
          };
          return acc;
        }, {} as { [key: number]: AvailabilityDay })
      );
    }
  }, [data]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const [selectedSlot, setSelectedSlot] = useState("");

  const handleChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  return (
    <Layout>
      <Navbar />
      {loading ? (
        <div className="mt-14"> </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4 mt-20">
          <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-6">
            <h1 className="text-center font-bold text-2xl mb-6">
              Availability
            </h1>
            <div className="mb-10 text-gray-500 font-sans">
              Set your weekly availability for your patients
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-xl font-normal text-black px-">
                  Slot:
                </span>
                <select
                  id="slot-timing"
                  className="px-3 py-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                  defaultValue={"15 min"}
                  value={selectedSlot}
                  onChange={handleChange}
                >
                  <option value="15 min">15 min</option>
                  <option value="30 min">30 min</option>
                  <option value="45 min">45 min</option>
                  <option value="60 min">1 hour</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row border rounded-2xl shadow-md p-6 w-full">
              <div className="lg:w-1/2 border-r-2 p-4">
                <h2 className="text-xl font-semibold mb-4">Weekly Hours</h2>
                <div className="space-y-4">
                  {weekDays.map((day) => (
                    <div
                      key={day.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={availability[day.id]?.selected || false}
                          onChange={() =>
                            setAvailability((prev) => ({
                              ...prev,
                              [day.id]: {
                                ...prev[day.id],
                                selected: !prev[day.id].selected,
                              },
                            }))
                          }
                          className="w-5 h-5 accent-blue-500 cursor-pointer"
                        />
                        <span className="text-lg font-medium">{day.title}</span>
                      </div>
                      {!availability[day.id]?.selected ? (
                        <div className="text-gray-600">Unavailable</div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {/* Start Time Input */}
                          <div className="relative">
                            <input
                              type="text"
                              value={
                                availability[day.id]?.startTime || "09:00 AM"
                              } // Default to fetched or placeholder time
                              onClick={() =>
                                toggleDropdown(day.id, "startTime")
                              }
                              onChange={(e) =>
                                handleTimeChange(
                                  day.id,
                                  "startTime",
                                  e.target.value
                                )
                              }
                              className="w-28 h-10 border rounded-lg px-2 text-sm cursor-pointer"
                            />

                            {availability[day.id]?.openDropdown ===
                              "startTime" && (
                              <div className="absolute mt-1 w-28 bg-white border border-gray-300 shadow-lg rounded-md max-h-40 overflow-y-auto z-10">
                                <ul className="space-y-1">
                                  {timeSlots.map((time, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item px-2 py-1 text-sm cursor-pointer hover:bg-gray-100"
                                      onClick={() => {
                                        setAvailability((prev) => ({
                                          ...prev,
                                          [day.id]: {
                                            ...prev[day.id],
                                            startTime: time,
                                            openDropdown: null,
                                          },
                                        }));
                                      }}
                                    >
                                      {time}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          <span className="text-lg font-medium">-</span>

                          {/* End Time Input */}
                          <div className="relative">
                            <input
                              type="text"
                              value={
                                availability[day.id]?.endTime || "09:00 PM"
                              } // Default to fetched or placeholder time
                              onClick={() => toggleDropdown(day.id, "endTime")}
                              className="w-28 h-10 border rounded-lg px-2 text-sm cursor-pointer"
                            />

                            {availability[day.id]?.openDropdown ===
                              "endTime" && (
                              <div className="absolute mt-1 w-28 bg-white border border-gray-300 shadow-lg rounded-md max-h-40 overflow-y-auto z-10">
                                <ul className="space-y-1">
                                  {timeSlots.map((time, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item px-2 py-1 text-sm cursor-pointer hover:bg-gray-100"
                                      onClick={() => {
                                        setAvailability((prev) => ({
                                          ...prev,
                                          [day.id]: {
                                            ...prev[day.id],
                                            endTime: time,
                                            openDropdown: null,
                                          },
                                        }));
                                      }}
                                    >
                                      {time}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleSave}
                    className="mt-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-white hover:shadow-lg px-10 py-2 rounded"
                  >
                    Save
                  </Button>
                </div>
              </div>

              <div className="lg:w-1/2 p-4">
                <h2 className="font-semibold text-xl">Date-Specific Hours</h2>
                <p className="text-sm text-gray-600 mb-2">
                  Override your availability / unavailability for specific dates
                  when your hours differ from your regular weekly hours.
                </p>
                <Button
                  className="bg-white text-gray-600 border border-gray-600 hover:bg-gray-100 rounded-2xl"
                  onClick={() => setShowModal(true)}
                >
                  + Add date-specific hours
                </Button>
              </div>
            </div>
          </div>

          <AvailabilityModal
            showModal={showModal}
            setShowModal={setShowModal}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      )}
    </Layout>
  );
};

export default Availability;
