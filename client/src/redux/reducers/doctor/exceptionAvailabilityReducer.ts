export const FETCH_EXCEPTION_AVAILABILITY = "FETCH_EXCEPTION_AVAILABILITY";
export const FETCH_EXCEPTION_AVAILABILITY_SUCCESS =
  "FETCH_EXCEPTION_AVAILABILITY_SUCCESS";
export const DELETE_EXCEPTION_AVAILABILITY = "DELETE_EXCEPTION_AVAILABILITY";

type ExceptionAvailabilityState = {
  data: any;
  loading: boolean;
  error: string | null;
};

type ExceptionAvailabilityAction = {
  type: string;
  payload?: any;
};

const initialStateException: ExceptionAvailabilityState = {
  data: null,
  loading: false,
  error: null,
};

const ExceptionavailabiltyReducer = (
  state = initialStateException,
  action: ExceptionAvailabilityAction
): ExceptionAvailabilityState => {
  switch (action.type) {
    case FETCH_EXCEPTION_AVAILABILITY:
      return { ...state, loading: true, error: null };

    case FETCH_EXCEPTION_AVAILABILITY_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };

    case DELETE_EXCEPTION_AVAILABILITY:
      return {
        ...state,
        data: Array.isArray(state.data)
          ? state.data.filter((item) => item.availability_id !== action.payload)
          : state.data,
      };

    default:
      return state; 
  }
};

export default ExceptionavailabiltyReducer;
