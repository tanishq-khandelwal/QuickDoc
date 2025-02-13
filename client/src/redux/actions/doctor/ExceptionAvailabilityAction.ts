export const FETCH_EXCEPTION_AVAILABILITY = "FETCH_EXCEPTION_AVAILABILITY";
export const FETCH_EXCEPTION_AVAILABILITY_SUCCESS = "FETCH_EXCEPTION_AVAILABILITY_SUCCESS";

export const fetchException=(doctorId:number)=>({
    type:FETCH_EXCEPTION_AVAILABILITY,
    payload:doctorId
})

export const fetchExceptionSuccess=()=>({
    type:FETCH_EXCEPTION_AVAILABILITY_SUCCESS,
})