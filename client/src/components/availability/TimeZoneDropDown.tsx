import React, { useState } from "react";
import { DateTime } from "luxon"; // Ensure you import DateTime from luxon

const timezones = [
  { label: "UTC", value: "UTC" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "Asia/Calcutta", value: "Asia/Calcutta" },
  { label: "Australia/Sydney", value: "Australia/Sydney" },
  // Add more timezones here as needed
];

const TimezoneDropdown = () => {
  var local = DateTime.local(2017, 5, 15, 9, 10, 23);
  const systemZone = local.zoneName || "";

  const [selectedTimezone, setSelectedTimezone] = useState<string>(systemZone);

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedTimezone(selectedOption);
    console.log("Selected Timezone:", selectedOption);
    console.log(selectedTimezone);
  };

  return (
    <div>
      <select onChange={handleTimezoneChange} defaultValue={systemZone} className="border-2 px-2 py-2 rounded-lg cursor-pointer">
        <option value="">Select Timezone</option>
        {timezones.map((timezone) => (
          <option key={timezone.value} value={timezone.value}>
            {timezone.label}
          </option>
        ))}
      </select>
      {/* <div>Selected Timezone: {selectedTimezone}</div> */}
    </div>
  );
};

export default TimezoneDropdown;
