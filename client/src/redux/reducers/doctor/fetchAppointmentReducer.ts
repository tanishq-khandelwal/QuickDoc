export const FETCH_APPOINTMENTS_REQUEST = "FETCH_APPOINTMENTS_REQUEST";
export const FETCH_APPOINTMENTS_SUCCESS = "FETCH_APPOINTMENTS_SUCCESS";
export const FETCH_APPOINTMENTS_FAILURE = "FETCH_APPOINTMENTS_FAILURE";

type AppointmentState = {
  data: any;
  loading: boolean;
  error: string | null;
};

type AppointmentAction = {
  type: string;
  payload?: any;
};

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