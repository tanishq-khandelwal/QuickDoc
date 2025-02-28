import React from "react";
import { AvailabilityComponentProps } from "../types";

const AvailabilityComponent: React.FC<AvailabilityComponentProps> = ({
  weekDays,
  availability,
  timeSlots,
  toggleDropdown,
  handleTimeChange,
  errors,
  setAvailability,
}) => {
  return (
    <div className="space-y-4">
      {weekDays.map((day) => (
        <div key={day.id} className="flex items-center justify-between">
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
                  value={availability[day.id]?.startTime || "09:00 AM"}
                  onClick={() => toggleDropdown(day.id, "startTime")}
                  onChange={(e) =>
                    handleTimeChange(day.id, "startTime", e.target.value)
                  }
                  className="w-28 h-10 border rounded-lg px-2 text-sm cursor-pointer"
                />
                {availability[day.id]?.openDropdown === "startTime" && (
                  <div className="absolute mt-1 w-28 bg-white border border-gray-300 shadow-lg rounded-md max-h-40 overflow-y-auto z-10">
                    <ul className="space-y-1">
                      {timeSlots?.map((time, index) => (
                        <li
                          key={index}
                          className="dropdown-item px-2 py-1 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleTimeChange(day.id, "startTime", time);
                            toggleDropdown(day.id, null);
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
                  value={availability[day.id]?.endTime || "09:00 PM"}
                  onClick={() => toggleDropdown(day.id, "endTime")}
                  onChange={(e) =>
                    handleTimeChange(day.id, "endTime", e.target.value)
                  }
                  className="w-28 h-10 border rounded-lg px-2 text-sm cursor-pointer"
                />
                {availability[day.id]?.openDropdown === "endTime" && (
                  <div className="absolute mt-1 w-28 bg-white border border-gray-300 shadow-lg rounded-md max-h-40 overflow-y-auto z-10">
                    <ul className="space-y-1">
                      {timeSlots.map((time, index) => (
                        <li
                          key={index}
                          className="dropdown-item px-2 py-1 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            handleTimeChange(day.id, "endTime", time);
                            toggleDropdown(day.id, null);
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
          {/* Display error message if any */}
          {errors[day.id] && (
            <div className="text-red-500 text-sm mt-1">{errors[day.id]}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvailabilityComponent;
