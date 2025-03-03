import { call, put, takeLatest } from "redux-saga/effects";

import { GET_EXCEPTION_AVAILABILITY } from "../../../queries/doctor/availability";
import client from "../../../apolloClient";
import {
  FETCH_EXCEPTION_AVAILABILITY,
  FETCH_EXCEPTION_AVAILABILITY_SUCCESS,
} from "./constant";

interface FetchExceptionAvailabilityAction {
  type: typeof FETCH_EXCEPTION_AVAILABILITY;
  payload: number;
}

interface ExceptionAvailabilityResponse {
  data: {
    exception_availability: any;
  };
}

// Worker Saga
function* fetchExceptionAvailabilitySaga(
  action: FetchExceptionAvailabilityAction
): Generator<any, void, ExceptionAvailabilityResponse> {
  try {
    const response: ExceptionAvailabilityResponse = yield call(client.query, {
      query: GET_EXCEPTION_AVAILABILITY,
      variables: { doctorId: action.payload },
      fetchPolicy:"network-only"
    });
    yield put({
      type: FETCH_EXCEPTION_AVAILABILITY_SUCCESS,
      payload: response?.data?.exception_availability,
    });
  } catch (error) {
    console.error(
      "An Error Occurred while fetching Exception Availabilities",
      error
    );
    yield put({
      type: "FETCH_EXCEPTION_AVAILABILITY_FAILURE",
      payload: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Watcher Saga
export function* watchFetchExceptionAvailability() {
  yield takeLatest<FetchExceptionAvailabilityAction>(
    FETCH_EXCEPTION_AVAILABILITY,
    fetchExceptionAvailabilitySaga
  );
}
