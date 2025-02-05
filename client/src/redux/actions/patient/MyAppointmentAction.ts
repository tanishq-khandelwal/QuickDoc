export const FETCH_MY_APPOINTMENTS_REQUEST = "FETCH_MY_APPOINTMENTS_REQUEST";
export const FETCH_MY_APPOINTMENTS_SUCCESS = "FETCH_MY_APPOINTMENTS_SUCCESS";
export const FETCH_MY_APPOINTMENTS_FAILURE = "FETCH_MY_APPOINTMENTS_FAILURE";

export const fetchMyAppointments = () => ({
    type: FETCH_MY_APPOINTMENTS_REQUEST,
    
})

export const fetchMyAppointmentsSuccess = (payload: any) => ({

    type: FETCH_MY_APPOINTMENTS_SUCCESS,
    payload
})

export const fetchMyAppointmentsFailure = () => ({
    type: FETCH_MY_APPOINTMENTS_FAILURE,
})