export const BOOK_APPOINTMENT_REQUEST = "BOOK_APPOINTMENT_REQUEST";
export const BOOK_APPOINTMENT_SUCCESS = "BOOK_APPOINTMENT_SUCCESS";
export const BOOK_APPOINTMENT_FAILURE = "BOOK_APPOINTMENT_FAILURE";


const initialState = {
    isloading: false,
    appointment: {},
    iserror: null,
};

const bookAppointmentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case BOOK_APPOINTMENT_REQUEST:
            return { isloading: true, appointment: {}, iserror: null };
        case BOOK_APPOINTMENT_SUCCESS:
            return { ...state, isloading: false, appointment: action.payload, iserror: null };
        case BOOK_APPOINTMENT_FAILURE:
            return { ...state, isloading: false, iserror: action.payload };
        default:
            return state;
    }
};  


export default bookAppointmentReducer;