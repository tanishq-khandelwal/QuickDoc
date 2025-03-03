import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";
import { TimeSlotPickerProps } from "./types";
import React from "react";

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  availableTimeSlots,
  selectedTime,
  setSelectedTime,
  role,
}) => {
  const convertTo12HourFormat = (slot: string): string => {
    return DateTime.fromFormat(slot, "HH:mm").toFormat("h:mm a");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
      <div className="h-full w-full py-2 px-5 overflow-y-auto max-h-[40vh] scrollbar-hide lg:overflow-visible">
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
              No time slots available for this day as Doctor is not Available at
              the given time
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPicker;
