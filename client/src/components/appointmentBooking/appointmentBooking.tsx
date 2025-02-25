import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";
import CheckoutButton from "@/stripe/checkoutForm";
import { generateAvailableTimeSlots } from "@/helper/patient/availability";
import { useSearchParams } from "react-router-dom";

const AppointmentBooking = ({
  data,
  availableDays,
  exceptionAvailabilities,
}: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const role = localStorage.getItem("role");
  const [searchParams] = useSearchParams();
  const doctorId = Number(searchParams.get("doctorId"));

  useEffect(() => {
    const formattedDate = DateTime.fromJSDate(selectedDate).toISODate() || "";
    const exceptionDay = exceptionAvailabilities.find(
      (e: any) => e.date === formattedDate
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
      (day: any) =>
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
  }, [selectedDate, availableDays, exceptionAvailabilities]);

  const disabledDays = (date: Date) => {
    const today = DateTime.local().startOf("day"); // Ensures time is 00:00
    const formattedDate = DateTime.fromJSDate(date).toISODate(); // Convert to "YYYY-MM-DD"

    // Check if the date exists in exception availabilities
    const exceptionDay = exceptionAvailabilities.find(
      (e: { date: string }) => e.date === formattedDate
    );

    if (exceptionDay) {
      return !exceptionDay.available;
    }

    const dayOfWeek = date
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
    const dayAvailability = availableDays.find(
      (d: { day: string; available: boolean }) => d.day === dayOfWeek
    );

    return DateTime.fromJSDate(date) < today || !dayAvailability?.available;
  };

  const convertTo12HourFormat = (slot: string) => {
    return DateTime.fromFormat(slot, "HH:mm").toFormat("h:mm a");
  };

  const finalformattedDate =
    selectedDate?.getFullYear() +
    "-" +
    (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    selectedDate.getDate().toString().padStart(2, "0");

  const handleBookingAppointment = () => {
    const addMinutes = (time: string, minutes: number) => {
      const [hours, mins] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(mins + minutes);
      return date.toTimeString().split(" ")[0].slice(0, 5);
    };

    const appointmentData = {
      doctorId: doctorId,
      appointmentDate: finalformattedDate,
      patientId: JSON.parse(localStorage.getItem("user") || "{}").user_id,
      startTime: selectedTime!,
      endTime: addMinutes(selectedTime!, data?.slot_duration),
    };

    sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    // toast.success("Appointment booked successfully!");
    // navigate("/");
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

        <div>
          <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
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
                        disabled={role === "guestpatient"}
                        className={`border-2 ${
                          selectedTime === slot
                            ? "bg-[#0067E7] text-white shadow-xl"
                            : "bg-[#F2F8FF] text-[#0067E7] border-[#0169FE]"
                        } hover:bg-[#0067E7] hover:text-white`}
                      >
                        {convertTo12HourFormat(slot)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="flex items-center justify-center text-center text-red-500">
                    No time slots available for this day as Doctor is not
                    Available at the given time
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {role === "guestpatient" ? (
        <div></div>
      ) : (
        <div className="flex justify-center mt-4">
          {selectedTime && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2 text-lg font-medium mb-2">
                Click to Book Appointment for{" "}
                <div className="text-red-600">
                  {selectedDate?.toLocaleDateString()}
                </div>{" "}
                at{" "}
                <div className="text-red-600">
                  {convertTo12HourFormat(selectedTime)} (
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

              <CheckoutButton
                onSuccess={handleBookingAppointment}
                price={data?.consultation_fee}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
