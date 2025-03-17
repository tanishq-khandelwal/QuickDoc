import { takeLatest, put, call } from "redux-saga/effects";
import client from "../../../apolloClient";
import { GET_ALL_APPOINTMENTS } from "../../../queries/doctor/appointment";
import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
} from "./constants";

export type AppointmentType = {
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

type FetchAppointmentAction = {
  type: typeof FETCH_APPOINTMENTS_REQUEST;
  payload: number;
};

const userData = localStorage.getItem("user");
const doctorId = userData ? JSON.parse(userData).doctorId : null;
console.log(doctorId);
function* fetchAppointment(action: FetchAppointmentAction) {
  try {
    const response: { data: { appointments: AppointmentType[] } } = yield call(
      client.query,
      {
        query: GET_ALL_APPOINTMENTS,
        variables: { doctorId: action.payload },
        fetchPolicy: "network-only",
      }
    );

    yield put({
      type: FETCH_APPOINTMENTS_SUCCESS,
      payload: response?.data?.appointments,
    });
  } catch (error) {
    console.error("Error fetching appointment:", error);
  }
}

export function* watchFetchAppointment() {
  // console.log("REached saga");
  yield takeLatest(FETCH_APPOINTMENTS_REQUEST, fetchAppointment);
}
