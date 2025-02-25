import { takeLatest, put, call } from "redux-saga/effects";
import client from "../../../apolloClient";
import { UPDATE_APPOINTMENT_STATUS } from "../../../queries/doctor/appointment";
import { APPOINTMENT_UPDATE_FAILURE, APPOINTMENT_UPDATE_REQUEST, APPOINTMENT_UPDATE_SUCCESS } from "./constants";

type appointmentResponse = {
    appointment_id:number
};

type appointmentAction = {
    type:typeof APPOINTMENT_UPDATE_REQUEST;
    payload: {
        appointmentId:number,
        status:string
    }
}



function* updateAppointment(action: appointmentAction) {
  try {
    const { appointmentId, status} = action.payload;
        console.log(appointmentId, status);
    const response:appointmentResponse = yield call(client.mutate, {
      mutation: UPDATE_APPOINTMENT_STATUS,
      variables: { appointmentId, status },
    });

    // Log the response
    console.log(response);
    yield put({ type: APPOINTMENT_UPDATE_SUCCESS, payload: response });
  } catch (error) {
    // Handle error
    yield put({ type: APPOINTMENT_UPDATE_FAILURE, payload:error });
    console.error("Error fetching appointment:", error);
  }
}

// Watch for the FETCH_APPOINTMENT action and call the fetchAppointment saga
export function* watchUpdateAppointment() {
  // console.log("REached saga");
  yield takeLatest(APPOINTMENT_UPDATE_REQUEST, updateAppointment);
}
