import {
  FETCH_AVAILABILITY_FAILURE,
  FETCH_AVAILABILITY_REQUEST,
  FETCH_AVAILABILITY_SUCCESS,
} from "./constants";
import { availabilityResponse } from "./saga";

type AvailabiltyState = {
  data: availabilityResponse | null;
  loading: boolean;
  error: string | null;
};

type AvailabiltyAction =
  | { type: typeof FETCH_AVAILABILITY_REQUEST }
  | { type: typeof FETCH_AVAILABILITY_SUCCESS; payload: availabilityResponse }
  | { type: typeof FETCH_AVAILABILITY_FAILURE; payload: string };

const initialState: AvailabiltyState = {
  data: null,
  loading: false,
  error: null,
};

const availabiltyReducer = (
  state = initialState,
  action: AvailabiltyAction
): AvailabiltyState => {
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

export default availabiltyReducer;
