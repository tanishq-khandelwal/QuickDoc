export interface Appointment {
  __typename: string;
  appointment_id: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  patient_time_zone: string;
  doctor: Doctor;
  status: string;
}

export interface AppointmentListProps {
  appointments: Appointment[];
}

export interface DoctorProfileData {
  user: {
    name: string;
  };
  specialization: string;
  experience_years: number;
  city: string;
  clinic_address: string;
  consultation_fee: number;
  slot_duration: number;
}
