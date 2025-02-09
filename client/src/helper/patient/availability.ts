import { DateTime } from "luxon";
// luxon
export async function getUserAvailability(data: any) {
  console.log(data);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const availability = daysOfWeek.map((day) => {
    const dayAvailability = data.doctor_availabilities.find(
      (availability) => availability.available_days.toLowerCase() === day
    );

    // console.log(dayAvailability);
    return {
      day,
      available: dayAvailability?dayAvailability.is_available:false,
      start_time: dayAvailability ? dayAvailability.start_time : null,
      end_time: dayAvailability ? dayAvailability.end_time : null,
      time_zone:dayAvailability ?dayAvailability.time_zone:null
    };
  });

  //   console.log(availability);
  return availability;
}

export function generateAvailableTimeSlots(
  startTime: string, // Start time (ISO string)
  endTime: string, // End time (ISO string)
  slot_duration = 15, // Slot duration in minutes
  selectedDate: string, // Selected date as a full Date string (e.g., "Mon Feb 10 2025 00:00:00 GMT+0530")
  doctorTimeZone: string, // Doctor's timezone (e.g., "Asia/Kolkata")
  bookings: any[] // List of existing bookings
) {
  const slots: string[] = [];

  // Get patient's system time zone
  const patientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convert selectedDate properly to YYYY-MM-DD format
  const selectedDateTime = DateTime.fromJSDate(new Date(selectedDate), { zone: doctorTimeZone }).toISODate();

  // Convert start and end times to doctor's timezone and attach the selected date
  const doctorStartDateTime = DateTime.fromISO(`${selectedDateTime}T${startTime}`, { zone: doctorTimeZone })
    .setZone(patientTimeZone);

  const doctorEndDateTime = DateTime.fromISO(`${selectedDateTime}T${endTime}`, { zone: doctorTimeZone })
    .setZone(patientTimeZone);

  console.log("Doctor's Time Zone:", doctorTimeZone);
  console.log("System (Patient's) Time Zone:", patientTimeZone);
  console.log("Doctor's Start Time:", doctorStartDateTime.toISO());
  console.log("Doctor's End Time:", doctorEndDateTime.toISO());

  let currentTime = doctorStartDateTime;

  // Get the current time in the system's time zone and the next available slot time
  const now = DateTime.now().setZone(patientTimeZone);
  const nextAvailableTime = now.plus({ minutes: 30 });

  console.log(nextAvailableTime.toISOTime());

  while (currentTime < doctorEndDateTime) {
    const slotEnd = currentTime.plus({ minutes: slot_duration });

    // Check if the slot is already book  ed
    const isSlotAvailable = !bookings?.some((booking) => {
      const bookingStart = DateTime.fromFormat(
        `${booking.appointment_date}T${booking.start_time}`,
        "yyyy-MM-dd'T'HH:mm:ss",
        { zone: patientTimeZone }
      );
      const bookingEnd = DateTime.fromFormat(
        `${booking.appointment_date}T${booking.end_time}`,
        "yyyy-MM-dd'T'HH:mm:ss",
        { zone: patientTimeZone }
      );

      return (
        (currentTime >= bookingStart && currentTime < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (currentTime <= bookingStart && slotEnd >= bookingEnd)
      );
    });

    // console.log(isSlotAvailable);
    console.log(currentTime.toISO(),nextAvailableTime.toISO());
    console.log(currentTime >= nextAvailableTime)

    if (isSlotAvailable && currentTime >= nextAvailableTime) {
      slots.push(currentTime.toFormat("HH:mm"));
    }

    currentTime = slotEnd;
  }

  console.log("Generated Slots:", slots);
  return slots;
}
