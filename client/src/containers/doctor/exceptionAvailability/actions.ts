import { DELETE_EXCEPTION_AVAILABILITY, FETCH_EXCEPTION_AVAILABILITY, FETCH_EXCEPTION_AVAILABILITY_SUCCESS } from "./constant";

export const fetchException=(doctorId:number)=>({
    type:FETCH_EXCEPTION_AVAILABILITY,
    payload:doctorId
})

export const fetchExceptionSuccess=()=>({
    type:FETCH_EXCEPTION_AVAILABILITY_SUCCESS,
})

export const deleteExceptionAvailability = (availabilityId: number) => ({
    type: DELETE_EXCEPTION_AVAILABILITY,
    payload: availabilityId,
  });