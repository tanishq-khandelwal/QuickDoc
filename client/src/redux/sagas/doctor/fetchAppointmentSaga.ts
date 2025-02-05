import { takeLatest, put, call } from "redux-saga/effects";
import client from "../../../apolloClient";
import { GET_ALL_APPOINTMENTS } from "../../../queries/doctor/appointment";
import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
} from "@/redux/reducers/doctor/fetchAppointmentReducer";

// type appointmentResponse = {
//   appointment_date: string;
//   appointment_time: string;
//   patient_name: string;
//   patient_email: string;
//   patient_phone: string;

// };
1;
const userData = localStorage.getItem("user");
const doctorId = userData ? JSON.parse(userData).doctorId : null;
 console.log(doctorId)
function* fetchAppointment() {
  try {
    const response = yield call(client.query, {
      query: GET_ALL_APPOINTMENTS,
      variables: { doctorId: doctorId },
    });

    // Log the response
    console.log(response);
    yield put({ type: FETCH_APPOINTMENTS_SUCCESS, payload: response });
  } catch (error) {
    // Handle error
    console.error("Error fetching appointment:", error);
  }
}

// Watch for the FETCH_APPOINTMENT action and call the fetchAppointment saga
export function* watchFetchAppointment() {
  // console.log("REached saga");
  yield takeLatest(FETCH_APPOINTMENTS_REQUEST, fetchAppointment);
}
