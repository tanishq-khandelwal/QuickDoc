import { FETCH_AVAILABILITY_FAILURE, FETCH_AVAILABILITY_REQUEST, FETCH_AVAILABILITY_SUCCESS } from "./constants"

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
