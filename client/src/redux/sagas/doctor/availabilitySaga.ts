import { takeLatest, call, put } from "redux-saga/effects";
import client from "../../../apolloClient";
import { FETCH_AVAILABILITY } from "../../../queries/doctor/availability";
import { FETCH_AVAILABILITY_REQUEST, FETCH_AVAILABILITY_SUCCESS } from "@/redux/actions/doctor/availabilityAction";

type availabilityResponse = {
  available_days: string;
  start_time: string;
  end_time: string;
};

function* fetchAvailability() {
  try {
    const response: availabilityResponse = yield call(client.query, {
      query: FETCH_AVAILABILITY,
    });
    
    // Log the response
    console.log(response);
    yield put({ type: FETCH_AVAILABILITY_SUCCESS, payload: response});

  } catch (error) {
    // Handle error
    console.error('Error fetching availability:');
  }
}

// Watch for the FETCH_AVAILABILITY action and call the fetchAvailability saga
export function* watchFetchAvailability() {
    console.log("REached saga");
  yield takeLatest(FETCH_AVAILABILITY_REQUEST, fetchAvailability);
}
