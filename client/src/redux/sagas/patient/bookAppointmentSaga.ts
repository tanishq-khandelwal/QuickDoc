import { takeLatest,call,put } from "redux-saga/effects";
import client from "../../../apolloClient";
import { BOOK_APPOINTMENT } from "../../../queries/patient/appointment";
import { BOOK_APPOINTMENT_REQUEST,BOOK_APPOINTMENT_FAILURE,BOOK_APPOINTMENT_SUCCESS } from "@/redux/reducers/patient/bookAppointmentReducer";

type appointmentAction = {
    type:typeof BOOK_APPOINTMENT_REQUEST;
    payload: {
        doctorId: number;
        appointmentDate: string;
        patientId: number;
        startTime: string;
        endTime: string;
    }
}

export function *bookAppointment(action: appointmentAction) {
    try {
        const { doctorId, appointmentDate, patientId, startTime, endTime } = action.payload;
        const patientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(doctorId, appointmentDate, patientId, startTime, endTime);
        const response = yield call(client.mutate, {
            mutation: BOOK_APPOINTMENT,
            variables: { doctorId, appointmentDate, patientId, startTime, endTime,patientTimeZone },
        });
        console.log(response);
        yield put({ type: BOOK_APPOINTMENT_SUCCESS, payload: response?.data?.insert_appointments?.returning[0]?.appointment_id });
    } catch (error:any) {
        yield put({ type:BOOK_APPOINTMENT_FAILURE,payload:error.message });
        console.error('Error booking appointment:', error);
    }
}

export function *watchBookAppointment() {
    yield takeLatest(BOOK_APPOINTMENT_REQUEST, bookAppointment);
}