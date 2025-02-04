import {format, addMinutes, isBefore } from "date-fns";

export async function getUserAvailability(data: any) {
//   console.log(data);

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

    return {
      day,
      available: dayAvailability ? true : false,
      start_time: dayAvailability ? dayAvailability.start_time : null,
      end_time: dayAvailability ? dayAvailability.end_time : null,
    };
  });

//   console.log(availability);
  return availability;
}


export function generateAvailableTimeSlots(
    startTime:Date,  // Start time (Date object)
    endTime:Date,    // End time (Date object)
    slot_duration = 15,  // Default slot duration to 15 minutes
    selectedDate:Date,  // Date object (e.g., "2025-02-04")
    bookings:any = []  // Existing bookings data
  ) {
    const slots = [];
  
    // Extract date components from selectedDate (year, month, day)
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();  // 0-indexed (January is 0)
    const day = selectedDate.getDate();
  
    // Combine date with the time to create full start and end date-times
    const startDateTime = new Date(year, month, day, startTime.getHours(), startTime.getMinutes());
    const endDateTime = new Date(year, month, day, endTime.getHours(), endTime.getMinutes());
  
    // console.log("Start DateTime:", startDateTime);
    // console.log("End DateTime:", endDateTime);
  
    // If the date is today, start from the next available slot after the current time
    const now = new Date();
    const additionalMinutes=addMinutes(now, 30);
    let currentTime = startDateTime;
  
    // Adjust the starting point if the date is today and currentTime is in the past
    if (format(now, "yyyy-MM-dd") === selectedDate.toLocaleDateString()) {
      if (isBefore(currentTime, now)) {
        // Add slot duration to current time to avoid generating past slots
        currentTime = addMinutes(now, slot_duration);
      }
    }

    // console.log("Current Time:", addMinutes(now, slot_duration));
  
    // Loop to generate time slots
    while (currentTime < endDateTime) {
      const slotEnd = new Date(currentTime.getTime() + slot_duration * 60000);
    //   console.log("Slot End:", slotEnd);
    //   console.log("Current Time:", currentTime);
  
      // Check if the slot is available
      const isSlotAvailable = !bookings.some((booking) => {
        const bookingStart = booking.startTime;
        const bookingEnd = booking.endTime;
        return (
          (currentTime >= bookingStart && currentTime < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
          (currentTime <= bookingStart && slotEnd >= bookingEnd)
        );
      });
  
      if (isSlotAvailable && currentTime >= additionalMinutes) {
        slots.push(format(currentTime, "HH:mm"));
      }
  
      // Move to the next slot
      currentTime = slotEnd;
    }
  
    console.log("Generated Slots:", slots);
    return slots;
  }
  