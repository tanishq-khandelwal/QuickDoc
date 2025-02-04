export const FETCH_DOCTOR_AVAILABILTY_REQUEST = "FETCH_DOCTOR_AVAILABILTY_REQUEST";
export const FETCH_DOCTOR_AVAILABILTY_SUCCESS = "FETCH_DOCTOR_AVAILABILTY_SUCCESS";
export const FETCH_DOCTOR_AVAILABILTY_FAILURE = "FETCH_DOCTOR_AVAILABILTY_FAILURE";

export const fetchDoctorAvailabilty = () => ({
    type: FETCH_DOCTOR_AVAILABILTY_REQUEST,
    });

export const fetchDoctorAvailabiltySuccess = (payload: any) => ({
    type: FETCH_DOCTOR_AVAILABILTY_SUCCESS,
    payload
});

export const fetchDoctorAvailabiltyFailure = () => ({
    type: FETCH_DOCTOR_AVAILABILTY_FAILURE,
}); 