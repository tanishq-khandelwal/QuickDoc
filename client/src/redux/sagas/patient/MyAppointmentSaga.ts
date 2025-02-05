import { takeLatest, put, call } from "redux-saga/effects";
import client from "../../../apolloClient";
import { GET_APPOINTMENTS } from "@/queries/patient/appointment";
import { FETCH_MY_APPOINTMENTS_FAILURE,FETCH_MY_APPOINTMENTS_SUCCESS,FETCH_MY_APPOINTMENTS_REQUEST } from "@/redux/reducers/patient/MyAppointmentReducer";


const userData = localStorage.getItem("user");
const userId = userData ? JSON.parse(userData).user_id : null;
console.log(userId);
function* fetchMyAppointment() {
    console.log("REached saga");
  try {
    const response = yield call(client.query, {
      query: GET_APPOINTMENTS,
      variables: { userId: userId },

      
    });

    // Log the response
    console.log("Response from API is"+response);
   
    yield put({ type: FETCH_MY_APPOINTMENTS_SUCCESS, payload: response });
  } catch (error) {
    // Handle error
    yield put({ type: FETCH_MY_APPOINTMENTS_FAILURE, payload: error });
    console.error("Error fetching appointment:", error);
  }
}

// Watch for the FETCH_APPOINTMENT action and call the fetchAppointment saga
export function* watchFetchMyAppointment() {
  // console.log("REached saga");
  yield takeLatest(FETCH_MY_APPOINTMENTS_REQUEST, fetchMyAppointment);
}
