import MyappointmentReducer from "../reducers"; // Adjust the path if needed
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
    const mockData = [{ id: 1, appointment: "Test Appointment" }];
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
