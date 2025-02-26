import { DateTime } from "luxon";

export const formatTime = (date: string, time: string, patientTimeZone: string) => {
    const local = DateTime.local();
    const systemZone = local.zoneName || "";
  
    const timeInPatientTZ = DateTime.fromISO(`${date}T${time}`, { zone: patientTimeZone });
    const timeInUTC = timeInPatientTZ.toUTC();
    const localTime = timeInUTC.setZone(systemZone);
  
    return systemZone === "Asia/Calcutta" ? localTime.toFormat("hh:mm a 'IST'") : localTime.toFormat("hh:mm a ZZZZ");
  };

//   How to write test case