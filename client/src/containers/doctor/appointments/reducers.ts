import { FETCH_APPOINTMENTS_FAILURE, FETCH_APPOINTMENTS_REQUEST, FETCH_APPOINTMENTS_SUCCESS } from "./constants";
import { AppointmentType } from "./saga";

type AppointmentState = {
  data: AppointmentType | null;
  loading: boolean;
  error: string | null;
};


type FetchAppointmentsRequestAction = { type: typeof FETCH_APPOINTMENTS_REQUEST };
type FetchAppointmentsSuccessAction = { 
  type: typeof FETCH_APPOINTMENTS_SUCCESS; 
  payload: AppointmentType; 
};
type FetchAppointmentsFailureAction = { 
  type: typeof FETCH_APPOINTMENTS_FAILURE; 
  payload: string; 
};

type AppointmentAction = 
  | FetchAppointmentsRequestAction
  | FetchAppointmentsSuccessAction
  | FetchAppointmentsFailureAction;

const initialState: AppointmentState = {
  data: null,
  loading: false,
  error: null,
};

const appointmentReducer = (
  state = initialState,
  action: AppointmentAction
): AppointmentState => {
  switch (action.type) {
    case FETCH_APPOINTMENTS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_APPOINTMENTS_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };

    case FETCH_APPOINTMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default appointmentReducer;