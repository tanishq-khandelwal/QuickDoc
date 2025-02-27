import MyappointmentReducer from "../reducers"; 
import {
  FETCH_MY_APPOINTMENTS_REQUEST,
  FETCH_MY_APPOINTMENTS_SUCCESS,
  FETCH_MY_APPOINTMENTS_FAILURE,
} from "../constants";

describe("MyappointmentReducer", () => {
  const initialState = {
    data: null,
    loading: false,
    error: null,
  };

  it("should return the initial state when an unknown action is dispatched", () => {
    expect(MyappointmentReducer(undefined, { type: "UNKNOWN_ACTION" })).toEqual(initialState);
  });

  it("should handle FETCH_MY_APPOINTMENTS_REQUEST", () => {
    const action = { type: FETCH_MY_APPOINTMENTS_REQUEST };
    const expectedState = { ...initialState, loading: true, error: null };

    expect(MyappointmentReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_MY_APPOINTMENTS_SUCCESS", () => {
    const mockData = {
      appointment_id: 1,
      appointment_date: "2025-02-26T10:00:00Z",
      patient_id: 123,
      start_time: "10:00 AM",
      end_time: "10:30 AM",
      patient_time_zone: "UTC",
      status: "approved",
        user: {
          name: "Dr. Smith",
          email:"tsk@gmail.com",
          phone_number: "123-456-7890",
        },
      
    };

    const action = { type: FETCH_MY_APPOINTMENTS_SUCCESS, payload: mockData };
    const expectedState = { ...initialState, data: mockData, loading: false, error: null };

    expect(MyappointmentReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_MY_APPOINTMENTS_FAILURE", () => {
    const mockError = "Failed to fetch appointments";
    const action = { type: FETCH_MY_APPOINTMENTS_FAILURE, payload: mockError };
    const expectedState = { ...initialState, loading: false, error: mockError };

    expect(MyappointmentReducer(initialState, action)).toEqual(expectedState);
  });
});
