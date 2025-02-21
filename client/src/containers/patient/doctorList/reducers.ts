import { FETCH_DOCTORS_FAILURE, FETCH_DOCTORS_REQUEST, FETCH_DOCTORS_SUCCESS } from "./constants";

type DoctorListAction = {
  type: string;
  payload?: any;
};

type DoctorListState = {
  doctors: any[];
  loading: boolean;
  error: string | null;
};

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
