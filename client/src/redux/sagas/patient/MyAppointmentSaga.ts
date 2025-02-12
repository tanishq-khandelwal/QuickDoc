import { takeLatest, put, call } from "redux-saga/effects";
import client from "../../../apolloClient";
import { GET_APPOINTMENTS } from "@/queries/patient/appointment";
import {
  FETCH_MY_APPOINTMENTS_FAILURE,
  FETCH_MY_APPOINTMENTS_SUCCESS,
  FETCH_MY_APPOINTMENTS_REQUEST,
} from "@/redux/reducers/patient/MyAppointmentReducer";

interface fetchMyAppointmentAction {
  type: typeof FETCH_MY_APPOINTMENTS_REQUEST;
  payload: { userId: number };
}

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

function* fetchMyAppointment(action: fetchMyAppointmentAction) {
  console.log("Reached saga");
  try {
    const userId = action.payload;
    const response: AppointmentType = yield call(client.query, {
      query: GET_APPOINTMENTS,
      variables: userId,
    });

    console.log("Response from API is" + response);

    yield put({ type: FETCH_MY_APPOINTMENTS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_MY_APPOINTMENTS_FAILURE, payload: error });
    console.error("Error fetching appointment:", error);
  }
}

export function* watchFetchMyAppointment() {
  // console.log("REached saga");
  yield takeLatest(FETCH_MY_APPOINTMENTS_REQUEST, fetchMyAppointment);
}
