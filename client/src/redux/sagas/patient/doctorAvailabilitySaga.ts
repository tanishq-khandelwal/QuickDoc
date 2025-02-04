import { takeLatest,call,put } from "redux-saga/effects";
import client from "../../../apolloClient";
import { FETCH_DOCTOR_AVAILABILITY } from "@/queries/patient/doctorlist";
import { FETCH_DOCTOR_AVAILABILTY_FAILURE, FETCH_DOCTOR_AVAILABILTY_REQUEST, FETCH_DOCTOR_AVAILABILTY_SUCCESS } from "@/redux/reducers/patient/doctorAvailabilityReducer";


export function* fetchDoctorAvailability() {
    try {
        console.log("Reached API Saga");
        const doctorId = 1;
        console.log(doctorId);
        const response = yield call(client.query, {
            query: FETCH_DOCTOR_AVAILABILITY,
            variables: { doctorId },
            fetchPolicy: "network-only",
        });
        console.log(response);
        yield put({ type: FETCH_DOCTOR_AVAILABILTY_SUCCESS, payload: response?.data?.doctors });
    } catch (error:any) {
        console.error('Error fetching doctors:', error);
        yield put({ type:FETCH_DOCTOR_AVAILABILTY_FAILURE,payload:error.message });
    }
}

export function* watchDoctorAvailabilty() {
    yield takeLatest(FETCH_DOCTOR_AVAILABILTY_REQUEST, fetchDoctorAvailability);
}
