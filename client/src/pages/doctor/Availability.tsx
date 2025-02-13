import { useEffect, useState } from "react";
import Layout from "@/Layout";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailability } from "@/redux/actions/doctor/availabilityAction";
import { RootState } from "@/redux/rootReducer";
import toast from "react-hot-toast";
import TimezoneDropdown from "@/components/availability/timezone/TimeZoneDropDown";
import { useMutation } from "@apollo/client";
import {  UPDATE_MULTIPLE_AVAILABILITIES } from "@/queries/doctor/availability";
import { DateTime } from "luxon";
import ExceptionAvailability from "@/components/availability/ExceptionAvailability/ExceptionAvailability";

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

  const [_modifiedDays, setModifiedDays] = useState(new Set<number>());
  const [availability, setAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>({});
  const [initialAvailability, setInitialAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>({});

  // const [updateAvailability] = useMutation(UPDATE_AVAILABILITY);

  const dispatch = useDispatch();
  const {
    data,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state: RootState) => state.doctoravailabilty);

  useEffect(() => {
    dispatch(fetchAvailability());
  }, [dispatch]);

  useEffect(() => {
    if (reduxLoading) {
      toast.loading("Loading...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (reduxError) toast.error(`Loading failed: ${reduxError}`);
    }
  }, [reduxLoading, reduxError]);

  useEffect(() => {
    if (data?.data?.doctor_availability) {
      const appointmentData = data.data.doctor_availability;
      const newAvailability = weekDays.reduce((acc, day) => {
        const appointment = appointmentData.find(
          (appt: any) => appt.available_days === day.title
        );
        acc[day.id] = {
          selected: appointment?.is_available,
          startTime: appointment
            ? formatTime(appointment.start_time)
            : "9:00 AM",
          endTime: appointment ? formatTime(appointment.end_time) : "9:00 PM",
          openDropdown: null,
        };
        return acc;
      }, {} as { [key: number]: AvailabilityDay });

      // Set the initial data after the first load
      setInitialAvailability(newAvailability);
      setAvailability(newAvailability);
    }
  }, [data]);

  const formatTime = (time: string) => {
    return DateTime.fromISO(time).toFormat("hh:mm a");
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

  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  console.log(errors);
  const handleTimeChange = (
    dayId: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setAvailability((prev) => {
      const updatedAvailability = {
        ...prev,
        [dayId]: { ...prev[dayId], [field]: value },
      };

      const start = DateTime.fromFormat(
        updatedAvailability[dayId].startTime,
        "h:mm a"
      );
      const end = DateTime.fromFormat(
        updatedAvailability[dayId].endTime,
        "h:mm a"
      );

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (start >= end) {
          newErrors[dayId] = "Start time must be earlier than end time";
        } else {
          delete newErrors[dayId]; // Remove error if time is valid
        }
        return newErrors;
      });

      return updatedAvailability;
    });

    setModifiedDays((prev) => new Set(prev).add(dayId));
  };

  type ChangedDay = {
    availableDay: string;
    startTime: string;
    endTime: string;
    available: boolean; // Track the selected status of the day
  };
  const [updateMultipleAvailabilities] = useMutation(UPDATE_MULTIPLE_AVAILABILITIES);
  const handleSave = () => {
    toast.loading("Loading..", { id: "loading" });
    const changedDaysArray: ChangedDay[] = weekDays.reduce((acc, day) => {
      const initialDay = initialAvailability[day.id];
      const modifiedDay = availability[day.id];

      const isTimeChanged =
        initialDay.startTime !== modifiedDay.startTime ||
        initialDay.endTime !== modifiedDay.endTime;
      const isSelectedChanged = initialDay.selected !== modifiedDay.selected;

      // If either time or selection status has changed
      if (isTimeChanged || isSelectedChanged) {
        acc.push({
          availableDay: day.title,
          startTime: modifiedDay.startTime,
          endTime: modifiedDay.endTime,
          available: modifiedDay.selected, // Add the selection status
        });
      }

      return acc;
    }, [] as ChangedDay[]); // Explicitly specify the type of the array here

    if (changedDaysArray.length > 0) {
      console.log("Changed Days and Timings:", changedDaysArray);
    }

    setModifiedDays(new Set()); // Reset modified state after saving
    const userData = localStorage.getItem("user");
    const doctorId = userData ? JSON.parse(userData).doctorId : null;

    try {
      const updates = changedDaysArray.map(day => ({
        where: {
          doctor_id: { _eq: doctorId },
          available_days: { _eq: day.availableDay }
        },
        _set: {
          start_time: DateTime.fromFormat(day.startTime, "h:mm a").toFormat("HH:mm:ss"),
          end_time: DateTime.fromFormat(day.endTime, "h:mm a").toFormat("HH:mm:ss"),
          is_available: day.available,
        }
      }));
  
      const response =updateMultipleAvailabilities({
        variables: {
          updates,
        },
      });

      console.log(response);
      toast.dismiss("loading");
      toast.success("Availability Updated");
    } catch (error) {
      toast.error(`Failed to update availability ${error}`);
      console.error(error);
    }
  };

  return (
    <Layout>
      <Navbar />
      {reduxLoading ? (
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

            <div className="flex mb-2 gap-4 items-center">
              <span className="text-xl text-black font-semibold">
                Time Zone :
              </span>
              <div>
                <TimezoneDropdown />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row border rounded-2xl shadow-md p-6 w-full">
              <div className="lg:w-1/2 lg:border-r-2 border-b-2  p-4">
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
              <div>
                <ExceptionAvailability />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Availability;
