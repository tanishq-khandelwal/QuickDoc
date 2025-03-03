import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_MULTIPLE_AVAILABILITIES } from "@/queries/doctor/availability";
import { DateTime } from "luxon";
import toast from "react-hot-toast";
import { weekDays, timeSlots } from "./constants";
import { fetchAvailability } from "./actions";
import { useDispatch } from "react-redux";

import { AvailabilityContainerProps, AvailabilityDay } from "./types";
import AvailabilityPresentation from "@/components/availability/AvailabilityPresentation";

const AvailabilityContainer: React.FC<AvailabilityContainerProps> = ({
  data,
  reduxLoading,
  doctorId,
}) => {
  const [modifiedDays, setModifiedDays] = useState<Set<number>>(
    new Set<number>()
  );
  const [availability, setAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>({});
  const [initialAvailability, setInitialAvailability] = useState<{
    [key: number]: AvailabilityDay;
  }>({});
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [disabled, setDisable] = useState<boolean>(false);
  const role = localStorage.getItem("role") || "";
  const dispatch = useDispatch();

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

    setModifiedDays((prev) => new Set(prev).add(dayId));
  };

  const [updateMultipleAvailabilities] = useMutation(
    UPDATE_MULTIPLE_AVAILABILITIES
  );

  const handleSave = async (): Promise<void> => {
    setDisable(true);
    toast.loading("Loading..", { id: "loading" });

    const changedDaysArray = weekDays.reduce(
      (acc, day) => {
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
      },
      [] as Array<{
        availableDay: string;
        startTime: string;
        endTime: string;
        available: boolean;
      }>
    );

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

      const response = await updateMultipleAvailabilities({
        variables: {
          updates,
        },
      });
      console.log(response);

      toast.dismiss("loading");
      toast.success("Availability Updated");
      setDisable(false);
      dispatch(fetchAvailability(doctorId));
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
    />
  );
};

export default AvailabilityContainer;
