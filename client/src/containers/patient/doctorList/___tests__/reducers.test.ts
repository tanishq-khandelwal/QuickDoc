import doctorlistReducer, { DoctorListAction } from "../reducers";
import {
  FETCH_DOCTORS_FAILURE,
  FETCH_DOCTORS_REQUEST,
  FETCH_DOCTORS_SUCCESS,
} from "../constants";
import { Doctor } from "../types";

describe("doctorlistReducer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const initialState = {
    doctors: [],
    loading: false,
    error: null,
  };

  it("should return the initial state when no action matches", () => {
    expect(
      doctorlistReducer(undefined, { type: "UNKNOWN_ACTION" } as any)
    ).toEqual(initialState);
  });

  it("should handle FETCH_DOCTORS_REQUEST", () => {
    const action: DoctorListAction = { type: FETCH_DOCTORS_REQUEST };
    const expectedState = {
      loading: true,
      doctors: [],
      error: null,
    };
    expect(doctorlistReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_DOCTORS_SUCCESS", () => {
    const doctors: Doctor[] = [
      {
        clinic_address: "123 Main St",
        created_at: "2023-01-01",
        slot_duration: 30,
        consultation_fee: 500,
        city: "New York",
        doctor_id: 1,
        specialization: "Cardiology",
        experience_years: 10,
        user: {
          name: "Dr. John Doe",
        },
      },
    ];

    const action: DoctorListAction = {
      type: FETCH_DOCTORS_SUCCESS,
      payload: doctors,
    };
    const expectedState = {
      loading: false,
      doctors,
      error: null,
    };

    expect(doctorlistReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_DOCTORS_FAILURE", () => {
    const action: DoctorListAction = {
      type: FETCH_DOCTORS_FAILURE,
      payload: "Failed to fetch doctors",
    };
    const expectedState = {
      loading: false,
      doctors: [],
      error: "Failed to fetch doctors",
    };

    expect(doctorlistReducer(initialState, action)).toEqual(expectedState);
  });
});
