import { FETCH_DOCTOR_AVAILABILTY_FAILURE, FETCH_DOCTOR_AVAILABILTY_REQUEST, FETCH_DOCTOR_AVAILABILTY_SUCCESS } from "./constants";

export const fetchDoctorAvailabilty = (doctorId: number) => ({
    type: FETCH_DOCTOR_AVAILABILTY_REQUEST,
    payload:{ doctorId }
    });

export const fetchDoctorAvailabiltySuccess = (payload: any) => ({
    type: FETCH_DOCTOR_AVAILABILTY_SUCCESS,
    payload
});

export const fetchDoctorAvailabiltyFailure = () => ({
    type: FETCH_DOCTOR_AVAILABILTY_FAILURE,
}); 