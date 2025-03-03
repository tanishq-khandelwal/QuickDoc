import { takeLatest, put, call } from "redux-saga/effects";
import client from "../../../apolloClient";
import { UPDATE_APPOINTMENT_STATUS } from "../../../queries/doctor/appointment";
import {
  APPOINTMENT_UPDATE_FAILURE,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
} from "./constants";

type appointmentResponse = {
  appointment_id: number;
};

type appointmentAction = {
  type: typeof APPOINTMENT_UPDATE_REQUEST;
  payload: {
    appointmentId: number;
    status: string;
  };
};

// Function to call the backend **Reject API** when status is "rejected"
const rejectAppointmentAPI = async (appointmentId: number) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/send/reject/${appointmentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

// Function to call the email API
const sendEmailAPI = async (appointmentId: number) => {
  const response = await fetch(
    `http://localhost:3000/api/v1/send/email/${appointmentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

function* updateAppointment(action: appointmentAction) {
  try {
    const { appointmentId, status } = action.payload;
    console.log("Updating Appointment:", appointmentId, status);

    // Update the appointment status in Hasura
    const response: appointmentResponse = yield call(client.mutate, {
      mutation: UPDATE_APPOINTMENT_STATUS,
      variables: { appointmentId, status },
    });

    console.log("Appointment Updated:", response);

    if (status.toLowerCase() === "rejected") {
      yield call(rejectAppointmentAPI, appointmentId);
      console.log("Reject API Triggered for Appointment:", appointmentId);
    }else if(status.toLowerCase() === "approved"){
      yield call(sendEmailAPI, appointmentId);
      console.log("Email API Triggered for Appointment:", appointmentId);
    }

   

    yield put({ type: APPOINTMENT_UPDATE_SUCCESS, payload: response });
  } catch (error) {
    console.error("Error updating appointment or triggering APIs:", error);
    yield put({ type: APPOINTMENT_UPDATE_FAILURE, payload: error });
  }
}

// Watcher Saga
export function* watchUpdateAppointment() {
  yield takeLatest(APPOINTMENT_UPDATE_REQUEST, updateAppointment);
}
