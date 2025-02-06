export const APPOINTMENT_UPDATE_REQUEST = "APPOINTMENT_UPDATE_REQUEST";
export const APPOINTMENT_UPDATE_SUCCESS = "APPOINTMENT_UPDATE_SUCCESS";
export const APPOINTMENT_UPDATE_FAILURE = "APPOINTMENT_UPDATE_FAILURE";

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

const updateAppointmentReducer = (
  state = initialState,
  action: AppointmentAction
): AppointmentState => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return { ...state, loading: true, error: null };

    case APPOINTMENT_UPDATE_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };

    case APPOINTMENT_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default updateAppointmentReducer;