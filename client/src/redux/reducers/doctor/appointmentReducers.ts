export const FETCH_AVAILABILITY_REQUEST = "FETCH_AVAILABILITY_REQUEST";
export const FETCH_AVAILABILITY_SUCCESS = "FETCH_AVAILABILITY_SUCCESS";
export const FETCH_AVAILABILITY_FAILURE = "FETCH_AVAILABILITY_FAILURE";

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
    case FETCH_AVAILABILITY_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_AVAILABILITY_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };

    case FETCH_AVAILABILITY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default appointmentReducer;
