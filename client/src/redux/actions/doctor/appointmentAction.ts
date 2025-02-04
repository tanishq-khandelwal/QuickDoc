export const FETCH_APPOINTMENTS_REQUEST = "FETCH_APPOINTMENTS_REQUEST";
export const FETCH_APPOINTMENTS_SUCCESS = "FETCH_APPOINTMENTS_SUCCESS";
export const FETCH_APPOINTMENTS_FAILURE = "FETCH_APPOINTMENTS_FAILURE";

export const fetchAppointments = () => ({
    type: FETCH_APPOINTMENTS_REQUEST,
    
})

export const fetchAppointmentsSuccess = (payload: any) => ({

    type: FETCH_APPOINTMENTS_SUCCESS,
    payload
})

export const fetchAppointmentsFailure = () => ({
    type: FETCH_APPOINTMENTS_FAILURE,
})