import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateTime } from "luxon";
import { useSearchParams } from "react-router-dom";
import { generateAvailableTimeSlots } from "@/helper/patient/availability";

import {
  AppointmentBookingProps,
  AvailabilityDay,
  ExceptionAvailability,
} from "./types";
import TimeSlotPicker from "./timeSlotPicker";
import ConfirmationModal from "./confirmationModal";
import { Button } from "../ui/button";

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  data,
  availableDays,
  exceptionAvailabilities,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const role = localStorage.getItem("role");
  const [searchParams] = useSearchParams();
  const doctorId = Number(searchParams.get("doctorId"));
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const formattedDate = DateTime.fromJSDate(selectedDate).toISODate() || "";
    const exceptionDay = exceptionAvailabilities.find(
      (e: ExceptionAvailability) => e.date === formattedDate
    );

    if (exceptionDay) {
      if (exceptionDay.available) {
        setAvailableTimeSlots(
          generateAvailableTimeSlots(
            exceptionDay.start_time,
            exceptionDay.end_time,
            data?.slot_duration,
            formattedDate,
            exceptionDay.time_zone,
            data?.appointments
          )
        );
      } else {
        setAvailableTimeSlots([]);
      }
      return;
    }

    const selectedDay = availableDays.find(
      (day: AvailabilityDay) =>
        day.day.toLowerCase() ===
        selectedDate.toLocaleString("en-US", { weekday: "long" }).toLowerCase()
    );

    if (selectedDay && selectedDay.available) {
      setAvailableTimeSlots(
        generateAvailableTimeSlots(
          selectedDay.start_time,
          selectedDay.end_time,
          data?.slot_duration,
          formattedDate,
          selectedDay.time_zone,
          data?.appointments
        )
      );
    }
  }, [selectedDate, availableDays, exceptionAvailabilities, data]);

  const disabledDays = (date: Date): boolean => {
    const today = DateTime.local().startOf("day");
    const formattedDate = DateTime.fromJSDate(date).toISODate();

    const exceptionDay = exceptionAvailabilities.find(
      (e: ExceptionAvailability) => e.date === formattedDate
    );

    if (exceptionDay) {
      return !exceptionDay.available;
    }

    const dayOfWeek = date
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
    const dayAvailability = availableDays.find(
      (d: AvailabilityDay) => d.day === dayOfWeek
    );

    return DateTime.fromJSDate(date) < today || !dayAvailability?.available;
  };

  const handleBookingAppointment = () => {
    const addMinutes = (time: string, minutes: number): string => {
      const [hours, mins] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(mins + minutes);
      return date.toTimeString().split(" ")[0].slice(0, 5);
    };

    const finalformattedDate =
      selectedDate?.getFullYear() +
      "-" +
      (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      selectedDate.getDate().toString().padStart(2, "0");

    const appointmentData = {
      doctorId: doctorId,
      appointmentDate: finalformattedDate,
      patientId: JSON.parse(localStorage.getItem("user") || "{}").user_id,
      startTime: selectedTime!,
      endTime: addMinutes(selectedTime!, data?.slot_duration),
    };

    sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    setShowConfirmModal(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-6">Doctor's Availability</h2>
      <span className="text-gray-600 pt-2">
        Select the date and time slot to book an appointment
      </span>

      <div className="flex justify-around px-4 ">
        <div className="bg-white rounded-lg p-6  w-96">
          <Calendar
            mode="single"
            className="mb-6 rounded-lg border p-4"
            selected={role === "guestpatient" ? undefined : selectedDate}
            onSelect={(date) => {
              setSelectedDate(date ?? new Date());
            }}
            disabled={
              role === "guestpatient"
                ? { before: new Date(3000, 0, 1) }
                : disabledDays
            }
          />
        </div>

        <TimeSlotPicker
          availableTimeSlots={availableTimeSlots}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          role={role}
        />
      </div>

      {role !== "guestpatient" && selectedTime && (
        <div className="flex justify-center mt-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2 text-lg font-medium mb-2">
              Click to Book Appointment for{" "}
              <div className="text-red-600">
                {selectedDate?.toLocaleDateString()}
              </div>{" "}
              at{" "}
              <div className="text-red-600">
                {DateTime.fromFormat(selectedTime, "HH:mm").toFormat("h:mm a")}{" "}
                (
                {Intl.DateTimeFormat().resolvedOptions().timeZone ===
                "Asia/Calcutta"
                  ? "IST"
                  : new Intl.DateTimeFormat("en-US", {
                      timeZone:
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                      timeZoneName: "short",
                    })
                      .formatToParts(new Date())
                      .find((part) => part.type === "timeZoneName")?.value}
                )
              </div>
            </div>

            <Button
              className="bg-[#0067E7] text-white hover:bg-blue-700"
              onClick={() => setShowConfirmModal(true)}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      )}

      <ConfirmationModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        consultationFee={data?.consultation_fee}
        handleBookingAppointment={handleBookingAppointment}
      />
    </div>
  );
};

export default AppointmentBooking;
