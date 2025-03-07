import { runSaga } from "redux-saga";
import { fetchDoctors } from "../saga";
import { FETCH_DOCTORS_SUCCESS, FETCH_DOCTORS_FAILURE } from "../constants";
import { ApolloQueryResult } from "@apollo/client";
import { Doctor } from "../types";

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

describe("fetchDoctors Saga", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches FETCH_DOCTORS_SUCCESS when API call is successful", async () => {
    const dispatched: any[] = [];

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

    const mockResponse: ApolloQueryResult<{ doctors: Doctor[] }> = {
      data: { doctors },
      loading: false,
      networkStatus: 7,
    };

    (client.query as jest.Mock).mockResolvedValue(mockResponse);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchDoctors
    ).toPromise();

    expect(dispatched).toContainEqual({
      type: FETCH_DOCTORS_SUCCESS,
      payload: doctors,
    });
  });

  it("dispatches FETCH_DOCTORS_FAILURE when API call fails", async () => {
    const dispatched: any[] = [];

    const errorMessage = "API error";
    (client.query as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchDoctors
    ).toPromise();

    expect(dispatched).toContainEqual({
      type: FETCH_DOCTORS_FAILURE,
      payload: errorMessage,
    });
  });
});
