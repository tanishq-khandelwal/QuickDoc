export const FETCH_DOCTORS_REQUEST = "FETCH_DOCTORS_REQUEST";
export const FETCH_DOCTORS_SUCCESS = "FETCH_DOCTORS_SUCCESS";
export const FETCH_DOCTORS_FAILURE = "FETCH_DOCTORS_FAILURE";

export const fetchDoctors = () => ({
    type: FETCH_DOCTORS_REQUEST,
    });

export const fetchDoctorsSuccess = (payload: any) => ({
    type: FETCH_DOCTORS_SUCCESS,
    payload
}); 

export const fetchDoctorsFailure = () => ({
    type: FETCH_DOCTORS_FAILURE,
});