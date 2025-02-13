import { DateTime } from "luxon";

export async function getUserAvailability(data: any) {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Extract exception availabilities (special dates)
  const exceptionAvailabilities = data?.exception_availabilities?.map((day) => ({
    date: DateTime.fromISO(day?.special_date, { zone: "Asia/Kolkata" }).toISODate(),
    available: day?.is_available,
    start_time: day?.start_time,
    end_time: day?.end_time,
    time_zone: "Asia/Kolkata",
  })) || [];

  // Extract regular weekly availabilities
  const availability = daysOfWeek.map((day) => {
    const dayAvailability = data.doctor_availabilities.find(
      (availability: any) => availability.available_days.toLowerCase() === day
    );

    return {
      day,
      available: dayAvailability ? dayAvailability.is_available : false,
      start_time: dayAvailability ? dayAvailability.start_time : null,
      end_time: dayAvailability ? dayAvailability.end_time : null,
      time_zone: dayAvailability ? dayAvailability.time_zone : null,
    };
  });

  return { availability, exceptionAvailabilities };
}


export function generateAvailableTimeSlots(
  startTime: string,
  endTime: string,
  slot_duration = 15,
  selectedDate: string,
  doctorTimeZone: string,
  bookings: any[]
) {
  const slots: string[] = [];

  // Get patient's system time zone
  const patientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convert selectedDate properly to YYYY-MM-DD format
  const selectedDateTime = DateTime.fromJSDate(new Date(selectedDate), {
    zone: doctorTimeZone,
  }).toISODate();

  // Convert start and end times to doctor's timezone and attach the selected date
  const doctorStartDateTime = DateTime.fromISO(
    `${selectedDateTime}T${startTime}`,
    { zone: doctorTimeZone }
  ).setZone(patientTimeZone);

  const doctorEndDateTime = DateTime.fromISO(`${selectedDateTime}T${endTime}`, {
    zone: doctorTimeZone,
  }).setZone(patientTimeZone);

  // console.log("Doctor's Time Zone:", doctorTimeZone);
  // console.log("System (Patient's) Time Zone:", patientTimeZone);
  // console.log("Doctor's Start Time:", doctorStartDateTime.toISO());
  // console.log("Doctor's End Time:", doctorEndDateTime.toISO());

  let currentTime = doctorStartDateTime;

  // Get the current time in the system's time zone and the next available slot time
  const now = DateTime.now().setZone(patientTimeZone);
  const nextAvailableTime = now.plus({ minutes: 30 });

  // console.log(nextAvailableTime.toISOTime());

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
    // console.log(currentTime.toISO(),nextAvailableTime.toISO());
    // console.log(currentTime >= nextAvailableTime)

    if (isSlotAvailable && currentTime >= nextAvailableTime) {
      slots.push(currentTime.toFormat("HH:mm"));
    }

    currentTime = slotEnd;
  }

  console.log("Generated Slots:", slots);
  return slots;
}
