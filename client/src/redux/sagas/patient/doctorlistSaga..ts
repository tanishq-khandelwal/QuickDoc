import { takeLatest,call,put } from "redux-saga/effects";
import client from "../../../apolloClient";
import { FETCH_DOCTORS } from "@/queries/patient/doctorlist";
import { FETCH_DOCTORS_FAILURE, FETCH_DOCTORS_SUCCESS } from "@/redux/actions/patient/doctorListAction";



export function* fetchDoctors() {
    try {
        const response = yield call(client.query, {
            query: FETCH_DOCTORS,
            fetchPolicy: "network-only",
        });
        // console.log(response);
        yield put({ type: FETCH_DOCTORS_SUCCESS, payload: response.data.doctors });
    } catch (error:any) {
        console.error('Error fetching doctors:', error);
        yield put({ type: FETCH_DOCTORS_FAILURE,payload:error.message });
    }
}

export function* watchFetchDoctors() {
    yield takeLatest("FETCH_DOCTORS_REQUEST", fetchDoctors);
}