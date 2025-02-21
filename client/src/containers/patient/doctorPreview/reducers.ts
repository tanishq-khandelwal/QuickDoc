import { FETCH_DOCTOR_AVAILABILTY_FAILURE, FETCH_DOCTOR_AVAILABILTY_REQUEST, FETCH_DOCTOR_AVAILABILTY_SUCCESS } from "./constants";

type DoctorAvailabilityAction = {
    type: string;
    payload?: any;
};

type DoctorAvailabilityState = {
    doctorAvailability: any[];
    loading: boolean;
    error: string | null;
};

const initialState = {
    loading: false,
    doctorAvailability: [],
    error: null,
    };

const doctorAvailabilityReducer = (state = initialState, action:DoctorAvailabilityAction):DoctorAvailabilityState => {
    switch (action.type) {
        case FETCH_DOCTOR_AVAILABILTY_REQUEST:
            // console.log("Reached Request Saga")
            return { loading: true, doctorAvailability: [], error: null };
        case FETCH_DOCTOR_AVAILABILTY_SUCCESS:
            // console.log("Reached Success Saga");
            return { ...state, loading: false, doctorAvailability: action.payload, error: null };
        case FETCH_DOCTOR_AVAILABILTY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default doctorAvailabilityReducer;