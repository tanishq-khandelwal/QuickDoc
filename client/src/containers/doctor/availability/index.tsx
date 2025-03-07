import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_MULTIPLE_AVAILABILITIES } from "@/queries/doctor/availability";
import { DateTime } from "luxon";
import toast from "react-hot-toast";
import { weekDays, timeSlots } from "./constants";

import { AvailabilityContainerProps, AvailabilityDay } from "./types";
import AvailabilityPresentation from "@/components/availability/AvailabilityPresentation";

const timezones = [
  { label: "UTC", value: "UTC" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "Asia/Calcutta", value: "Asia/Calcutta" },
  { label: "Australia/Sydney", value: "Australia/Sydney" },
];

const AvailabilityContainer: React.FC<AvailabilityContainerProps> = ({
  data,
  reduxLoading,
  doctorId,
}) => {
  const systemZone = DateTime.local().zoneName || "UTC";

  const [availability, setAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>({});
  const [selectedTimezone, setSelectedTimezone] = useState<string>(systemZone);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [disabled, setDisable] = useState<boolean>(false);
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

      setAvailability(newAvailability);

      // Set timezone from existing data if available
      if (appointmentData.length > 0 && appointmentData[0].time_zone) {
        setSelectedTimezone(appointmentData[0].time_zone);
      }
    }
  }, [data]);

  const formatTime = (time: string): string => {
    return DateTime.fromISO(time).toFormat("hh:mm a");
  };

  const toggleDropdown = (id: number, field: string | null): void => {
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
  ): void => {
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
  };

  const handleTimezoneChange = (timezone: string) => {
    setSelectedTimezone(timezone);
    console.log("Selected Timezone:", timezone);
  };

  const [updateMultipleAvailabilities] = useMutation(
    UPDATE_MULTIPLE_AVAILABILITIES
  );

  const handleSave = async (): Promise<void> => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please resolve time conflicts before saving");
      return;
    }

    setDisable(true);
    toast.loading("Loading..", { id: "loading" });

    try {
      const updates = weekDays.map((day) => ({
        where: {
          doctor_id: { _eq: doctorId },
          available_days: { _eq: day.title },
        },
        _set: {
          start_time: DateTime.fromFormat(
            availability[day.id].startTime,
            "h:mm a"
          ).toFormat("HH:mm:ss"),
          end_time: DateTime.fromFormat(
            availability[day.id].endTime,
            "h:mm a"
          ).toFormat("HH:mm:ss"),
          is_available: availability[day.id].selected,
          time_zone: selectedTimezone,
        },
      }));

      const response = await updateMultipleAvailabilities({
        variables: {
          updates,
        },
      });
      console.log(response);

      toast.dismiss("loading");
      toast.success("Availability Updated");
      setDisable(false);
      // dispatch(fetchAvailability(doctorId));
    } catch (error) {
      toast.dismiss("loading");
      toast.error(`Failed to update availability: ${error}`);
      console.error(error);
    }
  };

  return (
    <AvailabilityPresentation
      reduxLoading={reduxLoading}
      weekDays={weekDays}
      timeSlots={timeSlots}
      availability={availability}
      setAvailability={setAvailability}
      toggleDropdown={toggleDropdown}
      handleTimeChange={handleTimeChange}
      errors={errors}
      handleSave={handleSave}
      disabled={disabled || role === "guestdoctor"}
      selectedTimezone={selectedTimezone}
      onTimezoneChange={handleTimezoneChange}
      timezones={timezones}
    />
  );
};

export default AvailabilityContainer;
