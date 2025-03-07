import { Doctor } from "./types";
import {
  FETCH_DOCTORS_FAILURE,
  FETCH_DOCTORS_REQUEST,
  FETCH_DOCTORS_SUCCESS,
} from "./constants";

interface FetchDoctorsRequestAction {
  type: typeof FETCH_DOCTORS_REQUEST;
}

interface FetchDoctorsSuccessAction {
  type: typeof FETCH_DOCTORS_SUCCESS;
  payload: Doctor[];
}

interface FetchDoctorsFailureAction {
  type: typeof FETCH_DOCTORS_FAILURE;
  payload: string;
}

export type DoctorListAction =
  | FetchDoctorsRequestAction
  | FetchDoctorsSuccessAction
  | FetchDoctorsFailureAction;

interface DoctorListState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorListState = {
  doctors: [],
  loading: false,
  error: null,
};

const doctorlistReducer = (
  state = initialState,
  action: DoctorListAction
): DoctorListState => {
  switch (action.type) {
    case FETCH_DOCTORS_REQUEST:
      return { loading: true, doctors: [], error: null };
    case FETCH_DOCTORS_SUCCESS:
      return { ...state, loading: false, doctors: action.payload, error: null };
    case FETCH_DOCTORS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default doctorlistReducer;
