import doctorAvailabilityReducer, {
  DoctorAvailabilityAction,
} from "../reducers";
import {
  FETCH_DOCTOR_AVAILABILTY_FAILURE,
  FETCH_DOCTOR_AVAILABILTY_REQUEST,
  FETCH_DOCTOR_AVAILABILTY_SUCCESS,
} from "../constants";
import { DoctorAvailability } from "../types";

describe("doctorAvailabilityReducer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialState = {
    loading: false,
    doctorAvailability: [],
    error: null,
  };

  it("should return the initial state when no action is provided", () => {
    expect(doctorAvailabilityReducer(undefined, { type: "" as any })).toEqual(
      initialState
    );
  });

  it("should handle FETCH_DOCTOR_AVAILABILTY_REQUEST", () => {
    const action: DoctorAvailabilityAction = {
      type: FETCH_DOCTOR_AVAILABILTY_REQUEST,
    };
    const expectedState = {
      loading: true,
      doctorAvailability: [],
      error: null,
    };
    expect(doctorAvailabilityReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("should handle FETCH_DOCTOR_AVAILABILTY_SUCCESS", () => {
    const mockDoctorAvailability: DoctorAvailability[] = [
      {
        slot_duration: 30,
        specialization: "Dentist",
        experience_years: 10,
        consultation_fee: 500,
        city: "New York",
        clinic_address: "123 Main St",
        exception_availabilities: [
          {
            special_date: "2025-03-08",
            start_time: "09:00 AM",
            end_time: "12:00 PM",
            is_available: false,
          },
        ],
        doctor_availabilities: [
          {
            start_time: "09:00 AM",
            end_time: "05:00 PM",
            available_days: ["Monday", "Wednesday", "Friday"],
            is_available: true,
            time_zone: "EST",
          },
        ],
        appointments: [
          {
            appointment_date: "2025-03-09",
            start_time: "10:00 AM",
            end_time: "10:30 AM",
          },
        ],
        user: {
          name: "Dr. Smith",
        },
      },
    ];

    const action: DoctorAvailabilityAction = {
      type: FETCH_DOCTOR_AVAILABILTY_SUCCESS,
      payload: mockDoctorAvailability,
    };
    const expectedState = {
      loading: false,
      doctorAvailability: mockDoctorAvailability,
      error: null,
    };
    expect(doctorAvailabilityReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("should handle FETCH_DOCTOR_AVAILABILTY_FAILURE", () => {
    const errorMessage = "Failed to fetch availability";
    const action: DoctorAvailabilityAction = {
      type: FETCH_DOCTOR_AVAILABILTY_FAILURE,
      payload: errorMessage,
    };
    const expectedState = {
      loading: false,
      doctorAvailability: [],
      error: errorMessage,
    };
    expect(doctorAvailabilityReducer(initialState, action)).toEqual(
      expectedState
    );
  });
});
