import { takeLatest, put, call } from "redux-saga/effects";
import client from "@/apolloClient";
import { GET_APPOINTMENTS } from "@/queries/patient/appointment";
import { FETCH_MY_APPOINTMENTS_FAILURE, FETCH_MY_APPOINTMENTS_REQUEST, FETCH_MY_APPOINTMENTS_SUCCESS } from "./constants";
import { AppointmentType } from "@/containers/doctor/appointments/saga";
import { fetchMyAppointmentAction } from "./types";


export function* fetchMyAppointment(action: fetchMyAppointmentAction) {
  // console.log("Reached saga");
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
