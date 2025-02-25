import { produce } from "immer";

export const FETCH_EXCEPTION_AVAILABILITY = "FETCH_EXCEPTION_AVAILABILITY";
export const FETCH_EXCEPTION_AVAILABILITY_SUCCESS = "FETCH_EXCEPTION_AVAILABILITY_SUCCESS";
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
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCH_EXCEPTION_AVAILABILITY:
        draft.loading = true;
        draft.error = null;
        break;

      case FETCH_EXCEPTION_AVAILABILITY_SUCCESS:
        draft.data = action.payload;
        draft.loading = false;
        draft.error = null;
        break;

      case DELETE_EXCEPTION_AVAILABILITY:
        if (Array.isArray(draft.data)) {
          draft.data = draft.data.filter(
            (item) => item.availability_id !== action.payload
          );
        }
        break;

      default:
        return state;
    }
  });
};

export default ExceptionavailabiltyReducer;
