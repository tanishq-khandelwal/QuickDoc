export const FETCH_MY_APPOINTMENTS_REQUEST = "FETCH_MY_APPOINTMENTS_REQUEST";
export const FETCH_MY_APPOINTMENTS_SUCCESS = "FETCH_MY_APPOINTMENTS_SUCCESS";
export const FETCH_MY_APPOINTMENTS_FAILURE = "FETCH_MY_APPOINTMENTS_FAILURE";

export const fetchMyAppointments = (userId:number) => ({
    type: FETCH_MY_APPOINTMENTS_REQUEST,
    payload:{ userId }
    
})

export const fetchMyAppointmentsSuccess = (payload: any) => ({

    type: FETCH_MY_APPOINTMENTS_SUCCESS,
    payload
})

export const fetchMyAppointmentsFailure = () => ({
    type: FETCH_MY_APPOINTMENTS_FAILURE,
})