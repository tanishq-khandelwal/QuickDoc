export const FETCH_AVAILABILITY_REQUEST="FETCH_AVAILABILITY_REQUEST";
export const FETCH_AVAILABILITY_SUCCESS="FETCH_AVAILABILITY_SUCCESS";
export const FETCH_AVAILABILITY_FAILURE="FETCH_AVAILABILITY_FAILURE";
export const FETCH_EXCEPTION_AVAILABILITY="FETCH_EXCEPTION_AVAILABILITY";

export const fetchAvailability=(doctorId:number)=>({
    type:FETCH_AVAILABILITY_REQUEST,
    payload:doctorId
    
})

export const fetchAvailabilitySuccess=(payload:any)=>({

    type:FETCH_AVAILABILITY_SUCCESS,
    payload
})

export const fetchAvailabilityFailure=()=>({
    type:FETCH_AVAILABILITY_FAILURE,
})
