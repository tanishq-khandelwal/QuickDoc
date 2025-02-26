import { formatTime } from "../helper";
import { DateTime } from "luxon";

describe("formatTime Function", () => {
  // Test Case 1: Valid Input
  it("formats time correctly for valid inputs", () => {
    const date = "2023-10-15";
    const time = "10:00:00";
    const patientTimeZone = "UTC";

    const formattedTime = formatTime(date, time, patientTimeZone);

    // Expected output depends on the system's time zone
    const systemZone = DateTime.local().zoneName || "";
    const expectedTime = DateTime.fromISO(`${date}T${time}`, { zone: patientTimeZone })
      .toUTC()
      .setZone(systemZone)
      .toFormat(systemZone === "Asia/Calcutta" ? "hh:mm a 'IST'" : "hh:mm a ZZZZ");

    expect(formattedTime).toBe(expectedTime);
  });

  // Test Case 2: Different Time Zones
  it("handles different time zones correctly", () => {
    const date = "2023-10-15";
    const time = "10:00:00";

    // Test with "America/New_York" time zone
    const formattedTimeNY = formatTime(date, time, "America/New_York");
    const systemZone = DateTime.local().zoneName || "";
    const expectedTimeNY = DateTime.fromISO(`${date}T${time}`, { zone: "America/New_York" })
      .toUTC()
      .setZone(systemZone)
      .toFormat(systemZone === "Asia/Calcutta" ? "hh:mm a 'IST'" : "hh:mm a ZZZZ");

    expect(formattedTimeNY).toBe(expectedTimeNY);

    // Test with "Asia/Tokyo" time zone
    const formattedTimeTokyo = formatTime(date, time, "Asia/Tokyo");
    const expectedTimeTokyo = DateTime.fromISO(`${date}T${time}`, { zone: "Asia/Tokyo" })
      .toUTC()
      .setZone(systemZone)
      .toFormat(systemZone === "Asia/Calcutta" ? "hh:mm a 'IST'" : "hh:mm a ZZZZ");

    expect(formattedTimeTokyo).toBe(expectedTimeTokyo);
  });

  // Test Case 3: Invalid Date or Time
  it("handles invalid date or time gracefully", () => {
    const invalidDate = "invalid-date";
    const invalidTime = "invalid-time";
    const patientTimeZone = "UTC";

    const formattedTime = formatTime(invalidDate, invalidTime, patientTimeZone);

    // Luxon returns "Invalid DateTime" for invalid inputs
    expect(formattedTime).toBe("Invalid DateTime");
  });

 
  // Test Case 5: Special Case for "Asia/Calcutta" Time Zone
  it("formats time correctly for 'Asia/Calcutta' time zone", () => {
    const date = "2023-10-15";
    const time = "10:00:00";
    const patientTimeZone = "Asia/Calcutta";

    const formattedTime = formatTime(date, time, patientTimeZone);

    // Expected output for "Asia/Calcutta" time zone
    const expectedTime = DateTime.fromISO(`${date}T${time}`, { zone: patientTimeZone })
      .toUTC()
      .setZone(DateTime.local().zoneName || "")
      .toFormat("hh:mm a 'IST'");

    expect(formattedTime).toBe(expectedTime);
  });
});