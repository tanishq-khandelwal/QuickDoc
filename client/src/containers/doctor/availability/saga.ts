import { takeLatest, call, put } from "redux-saga/effects";
import client from "../../../apolloClient";
import { FETCH_AVAILABILITY } from "../../../queries/doctor/availability";
import { FETCH_AVAILABILITY_REQUEST, FETCH_AVAILABILITY_SUCCESS } from "./constants";


export type availabilityResponse = {
  available_days: string;
  start_time: string;
  end_time: string;
  is_available:boolean
};

type FetchAvailabilityAction={
  type: typeof FETCH_AVAILABILITY_REQUEST;
  payload: number;
}

//  const userData=localStorage.getItem("user");
//  const doctorId=userData?JSON.parse(userData).doctorId:null;
//  console.log(doctorId)

function* fetchAvailability(action:FetchAvailabilityAction){
  try {
    const response: availabilityResponse = yield call(client.query, {
      query: FETCH_AVAILABILITY,
      variables:{doctorId: action.payload },
      fetchPolicy:"network-only"
    });
    
    // Log the response
    console.log(response);
    yield put({ type: FETCH_AVAILABILITY_SUCCESS, payload: response});

  } catch (error) {
    // Handle error
    console.error('Error fetching availability:',error);
  }
}

// Watch for the FETCH_AVAILABILITY action and call the fetchAvailability saga
export function* watchFetchAvailability() {
    // console.log("REached saga");
  yield takeLatest(FETCH_AVAILABILITY_REQUEST, fetchAvailability);
}
