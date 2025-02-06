export const FETCH_APPOINTMENTS_REQUEST = "FETCH_APPOINTMENTS_REQUEST";
export const FETCH_APPOINTMENTS_SUCCESS = "FETCH_APPOINTMENTS_SUCCESS";
export const FETCH_APPOINTMENTS_FAILURE = "FETCH_APPOINTMENTS_FAILURE";
// Actions for Appointment status update
export const APPOINTMENT_UPDATE_REQUEST = "APPOINTMENT_UPDATE_REQUEST";
export const APPOINTMENT_UPDATE_SUCCESS = "APPOINTMENT_UPDATE_SUCCESS";
export const APPOINTMENT_UPDATE_FAILURE = "APPOINTMENT_UPDATE_FAILURE";

// for fetching doctors appointments
export const fetchAppointments = () => ({
  type: FETCH_APPOINTMENTS_REQUEST,
});

export const fetchAppointmentsSuccess = (payload: any) => ({
  type: FETCH_APPOINTMENTS_SUCCESS,
  payload,
});

export const fetchAppointmentsFailure = () => ({
  type: FETCH_APPOINTMENTS_FAILURE,
});

// for updating appointment status

export const updateApppointment = (data: {
  appointmentId: number;
  status: string;
}) => ({
  type: APPOINTMENT_UPDATE_REQUEST,
  payload: data,
});

export const updateAppointmentSuccess = (payload: any) => ({
  type: APPOINTMENT_UPDATE_SUCCESS,
  payload,
});

export const updateAppointmentFailure = (error: string) => ({
  type: APPOINTMENT_UPDATE_FAILURE,
  error,
});
