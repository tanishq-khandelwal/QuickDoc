import { Doctor } from "./doctorList/saga";

interface User {
  email: string;
  name: string;
  phone_number: string;
  __typename: string;
}

export interface Doctor {
  clinic_address: string;
  created_at: string;
  slot_duration: number;
  consultation_fee: number;
  city: string;
  doctor_id: number;
  specialization: string;
  experience_years: number;
  user: {
      name: string;
  };
};

interface DoctorCardProps {
  doctor: Doctor
}

interface AvailabilityDay {
  day: string;
  available: boolean;
  start_time: string;
  end_time: string;
  time_zone: string;
}

interface ExceptionAvailability {
  date: string;
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

export interface Appointment {
  __typename: string;
  appointment_id:number
  appointment_date: string;
  start_time: string;
  end_time: string;
  patient_time_zone: string;
  doctor: Doctor;
  status: string;
}

export interface MyAppointmentsState {
  data: {
    data: {
      appointments: Appointment[];
    };
  };
  loading: boolean;
  error: string | null;
}

export interface AppointmentListProps {
  appointments: Appointment[];
}


export interface DoctorAvailability {
  slot_duration: number;
  specialization: string;
  experience_years: number;
  consultation_fee: number;
  city: string;
  clinic_address: string;
  exception_availabilities: {
    special_date: string;
    start_time: string;
    end_time: string;
    is_available: boolean;
  }[];
  doctor_availabilities: {
    end_time: string;
    start_time: string;
    available_days: string[];
    is_available: boolean;
    time_zone: string;
  }[];
  appointments: {
    appointment_date: string;
    end_time: string;
    start_time: string;
  }[];
  user: {
    name: string;
  };
}
