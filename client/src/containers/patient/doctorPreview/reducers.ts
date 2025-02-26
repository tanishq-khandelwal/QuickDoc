import { DoctorAvailability } from "../types";
import {
  FETCH_DOCTOR_AVAILABILTY_FAILURE,
  FETCH_DOCTOR_AVAILABILTY_REQUEST,
  FETCH_DOCTOR_AVAILABILTY_SUCCESS,
} from "./constants";

interface FetchDoctorAvailabilityRequestAction {
  type: typeof FETCH_DOCTOR_AVAILABILTY_REQUEST;
}

interface FetchDoctorAvailabilitySuccessAction {
  type: typeof FETCH_DOCTOR_AVAILABILTY_SUCCESS;
  payload: DoctorAvailability[];
}

interface FetchDoctorAvailabilityFailureAction {
  type: typeof FETCH_DOCTOR_AVAILABILTY_FAILURE;
  payload: string;
}

type DoctorAvailabilityAction =
  | FetchDoctorAvailabilityRequestAction
  | FetchDoctorAvailabilitySuccessAction
  | FetchDoctorAvailabilityFailureAction;

interface DoctorAvailabilityState {
  doctorAvailability: DoctorAvailability[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorAvailabilityState = {
  loading: false,
  doctorAvailability: [],
  error: null,
};

// Reducer function
const doctorAvailabilityReducer = (
  state: DoctorAvailabilityState = initialState,
  action: DoctorAvailabilityAction
): DoctorAvailabilityState => {
  switch (action.type) {
    case FETCH_DOCTOR_AVAILABILTY_REQUEST:
      return { ...state, loading: true, doctorAvailability: [], error: null };
    case FETCH_DOCTOR_AVAILABILTY_SUCCESS:
      return {
        ...state,
        loading: false,
        doctorAvailability: action.payload,
        error: null,
      };
    case FETCH_DOCTOR_AVAILABILTY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default doctorAvailabilityReducer;
