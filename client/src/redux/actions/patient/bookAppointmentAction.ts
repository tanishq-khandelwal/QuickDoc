export const BOOK_APPOINTMENT_REQUEST = "BOOK_APPOINTMENT_REQUEST";
export const BOOK_APPOINTMENT_SUCCESS = "BOOK_APPOINTMENT_SUCCESS";
export const BOOK_APPOINTMENT_FAILURE = "BOOK_APPOINTMENT_FAILURE";


export const bookAppointment = (appointment: {
    doctorId: number;
    appointmentDate: string;
    patientId: number;
    startTime: string;
    endTime: string;
}) => ({
    type: BOOK_APPOINTMENT_REQUEST,
    payload: appointment, 

});


export const bookAppointmentSuccess = (payload: any) => ({
    type: BOOK_APPOINTMENT_SUCCESS,
    payload,
});


export const bookAppointmentFailure = (error: string) => ({
    type: BOOK_APPOINTMENT_FAILURE,
    payload: error, 
});
