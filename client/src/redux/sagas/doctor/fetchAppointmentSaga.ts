import { takeLatest, put, call } from "redux-saga/effects";
import client from "../../../apolloClient";
import { GET_ALL_APPOINTMENTS } from "../../../queries/doctor/appointment";
import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
} from "@/redux/reducers/doctor/fetchAppointmentReducer";


type AppointmentType = {
  appointment_id: number;
  appointment_date: string; 
  patient_id: number;
  start_time: string; 
  end_time: string;
  patient_time_zone: string;
  status: string;
  user: {
    name: string;
    email: string;
    phone_number: string;
  };
};

const userData = localStorage.getItem("user");
const doctorId = userData ? JSON.parse(userData).doctorId : null;
 console.log(doctorId)
function* fetchAppointment() {
  try {
    const response:AppointmentType = yield call(client.query, {
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
