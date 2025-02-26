import {
  FETCH_MY_APPOINTMENTS_FAILURE,
  FETCH_MY_APPOINTMENTS_REQUEST,
  FETCH_MY_APPOINTMENTS_SUCCESS,
} from "./constants";
import { AppointmentType } from "./saga";

interface AppointmentState {
  data: AppointmentType | null;
  loading: boolean;
  error: string | null;
}

interface AppointmentAction {
  type: string;
  payload?: AppointmentType | null | string;
}

const initialState: AppointmentState = {
  data: null,
  loading: false,
  error: null,
};

const MyappointmentReducer = (
  state = initialState,
  action: AppointmentAction
): AppointmentState => {
  switch (action.type) {
    case FETCH_MY_APPOINTMENTS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_MY_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload as AppointmentType,
        loading: false,
        error: null,
      };

    case FETCH_MY_APPOINTMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error:
          typeof action.payload === "string" ? action.payload : "Unknown error",
      };

    default:
      return state;
  }
};

export default MyappointmentReducer;
