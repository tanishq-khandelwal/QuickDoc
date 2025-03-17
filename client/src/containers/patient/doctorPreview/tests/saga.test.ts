import { runSaga } from "redux-saga";
import { fetchDoctorAvailability, watchDoctorAvailabilty } from "../sagas";
import {
  FETCH_DOCTOR_AVAILABILTY_FAILURE,
  FETCH_DOCTOR_AVAILABILTY_REQUEST,
  FETCH_DOCTOR_AVAILABILTY_SUCCESS,
} from "../constants";
import { FETCH_DOCTOR_AVAILABILITY } from "@/queries/patient/doctorlist";
import { takeLatest } from "redux-saga/effects";

jest.mock("@/apolloClient", () => {
  const mockClient = {
    query: jest.fn(),
  };
  return {
    __esModule: true,
    default: mockClient,
  };
});

import client from "@/apolloClient";

describe("fetchDoctorAvailability Saga", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const doctorId = 1;

  it("should fetch doctor availability and dispatch success action", async () => {
    const mockData = {
      data: {
        doctors: [
          {
            doctor_id: 1,
            specialization: "Dentist",
            experience_years: 10,
          },
        ],
      },
    };

    (client.query as jest.Mock).mockResolvedValue(mockData);

    const dispatched: any[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchDoctorAvailability,
      { type: FETCH_DOCTOR_AVAILABILTY_REQUEST, payload: { doctorId } }
    ).toPromise();

    expect(client.query).toHaveBeenCalledWith({
      query: FETCH_DOCTOR_AVAILABILITY,
      variables: { doctorId },
      fetchPolicy: "network-only",
    });

    expect(dispatched).toContainEqual({
      type: FETCH_DOCTOR_AVAILABILTY_SUCCESS,
      payload: mockData.data.doctors,
    });
  });

  it("should handle API failure and dispatch failure action", async () => {
    const errorMessage = "Failed to fetch doctor availability";

    (client.query as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const dispatched: any[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchDoctorAvailability,
      { type: "FETCH_DOCTOR_AVAILABILTY_REQUEST", payload: { doctorId } }
    ).toPromise();

    expect(dispatched).toContainEqual({
      type: FETCH_DOCTOR_AVAILABILTY_FAILURE,
      payload: errorMessage,
    });
  });
});

describe("watchDoctorAvailabilty Saga", () => {
  it("should listen for FETCH_DOCTOR_AVAILABILTY_REQUEST action", () => {
    const generator = watchDoctorAvailabilty();
    expect(generator.next().value).toEqual(
      takeLatest(FETCH_DOCTOR_AVAILABILTY_REQUEST, fetchDoctorAvailability)
    );
  });
});
