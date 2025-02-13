export const FETCH_EXCEPTION_AVAILABILITY = "FETCH_EXCEPTION_AVAILABILITY";
export const FETCH_EXCEPTION_AVAILABILITY_SUCCESS = "FETCH_EXCEPTION_AVAILABILITY_SUCCESS";
export const DELETE_EXCEPTION_AVAILABILITY = "DELETE_EXCEPTION_AVAILABILITY";

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