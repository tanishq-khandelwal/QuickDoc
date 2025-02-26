export interface AvailabilityDay {
    day: string;
    available: boolean;
    start_time: string;
    end_time: string;
    time_zone: string;
  }
  

export interface AppointmentBookingProps {
  data: DoctorData;
  availableDays: AvailabilityDay[];
  exceptionAvailabilities: ExceptionAvailability[];
}

export interface ExceptionAvailability {
    date: string;
    available: boolean;
    start_time: string;
    end_time: string;
    time_zone: string;
  }