import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_MULTIPLE_AVAILABILITIES } from "@/queries/doctor/availability";
import { DateTime } from "luxon";
import AvailabilityComponent from "@/components/availability/AvailabilityComponent/availabilityComponenet";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import TimezoneDropdown from "@/components/availability/timezone/TimeZoneDropDown";
import { timeSlots, weekDays } from "./constants";
import ExceptionAvailabilityContainer from "../exceptionAvailability";

interface AvailabilityDay {
  selected: boolean;
  startTime: string;
  endTime: string;
  openDropdown: string | null;
}

interface AvailabilityContainerProps {
  data: any;
  reduxLoading: boolean;
  doctorId: string | null;
}

const AvailabilityContainer = ({
  data,
  reduxLoading,
  doctorId,
}: AvailabilityContainerProps) => {
  const [_modifiedDays, setModifiedDays] = useState(new Set<number>());
  const [availability, setAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>({});
  const [initialAvailability, setInitialAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>({});
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const role = localStorage.getItem("role") || "";

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

      setInitialAvailability(newAvailability);
      setAvailability(newAvailability);
    }
  }, [data]);

  const formatTime = (time: string) => {
    return DateTime.fromISO(time).toFormat("hh:mm a");
  };

  const toggleDropdown = (id: number, field: string | null) => {
    setAvailability((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        openDropdown: prev[id].openDropdown === field ? null : field,
      },
    }));
  };

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
          delete newErrors[dayId];
        }
        return newErrors;
      });

      return updatedAvailability;
    });

    setModifiedDays((prev) => new Set(prev).add(dayId));
  };

  const [updateMultipleAvailabilities] = useMutation(
    UPDATE_MULTIPLE_AVAILABILITIES
  );

  const handleSave = () => {
    toast.loading("Loading..", { id: "loading" });
    const changedDaysArray = weekDays.reduce((acc, day) => {
      const initialDay = initialAvailability[day.id];
      const modifiedDay = availability[day.id];

      const isTimeChanged =
        initialDay.startTime !== modifiedDay.startTime ||
        initialDay.endTime !== modifiedDay.endTime;
      const isSelectedChanged = initialDay.selected !== modifiedDay.selected;

      if (isTimeChanged || isSelectedChanged) {
        acc.push({
          availableDay: day.title,
          startTime: modifiedDay.startTime,
          endTime: modifiedDay.endTime,
          available: modifiedDay.selected,
        });
      }

      return acc;
    }, [] as { availableDay: string; startTime: string; endTime: string; available: boolean }[]);

    if (changedDaysArray.length > 0) {
      console.log("Changed Days and Timings:", changedDaysArray);
    }

    setModifiedDays(new Set());

    try {
      const updates = changedDaysArray.map((day) => ({
        where: {
          doctor_id: { _eq: doctorId },
          available_days: { _eq: day.availableDay },
        },
        _set: {
          start_time: DateTime.fromFormat(day.startTime, "h:mm a").toFormat(
            "HH:mm:ss"
          ),
          end_time: DateTime.fromFormat(day.endTime, "h:mm a").toFormat(
            "HH:mm:ss"
          ),
          is_available: day.available,
        },
      }));

      const response = updateMultipleAvailabilities({
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
    <>
      {reduxLoading ? (
        <div className="mt-14"></div>
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
              <div className="lg:w-1/2 lg:border-r-2 border-b-2 p-4">
                <AvailabilityComponent
                  weekDays={weekDays}
                  availability={availability}
                  timeSlots={timeSlots}
                  toggleDropdown={toggleDropdown}
                  handleTimeChange={handleTimeChange}
                  errors={errors}
                  setAvailability={setAvailability}
                />

                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleSave}
                    disabled={role === "guestdoctor"}
                    className="mt-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-white hover:shadow-lg px-10 py-2 rounded"
                  >
                    Save
                  </Button>
                </div>
              </div>
              <div>
                <ExceptionAvailabilityContainer />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvailabilityContainer;
