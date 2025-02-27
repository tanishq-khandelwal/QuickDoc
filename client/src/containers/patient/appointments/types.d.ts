export interface fetchMyAppointmentAction {
  type: typeof FETCH_MY_APPOINTMENTS_REQUEST;
  payload: { userId: number };
}
export interface AppointmentType {
  appointment_id: number;
  appointment_date: string;
  patient_id: number;
  start_time: string;
  end_time: string;
  patient_time_zone: string;
  status: string;
  user: {
    name: string;
    email: string;
    phone_number: string;
  };
}

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

export interface MyAppointmentsState {
  data: {
    data: {
      appointments: Appointment[];
    };
  };
  loading: boolean;
  error: string | null;
}
