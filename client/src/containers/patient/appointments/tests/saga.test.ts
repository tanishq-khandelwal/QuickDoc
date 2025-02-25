import { runSaga } from "redux-saga";
import client from "@/apolloClient";
import { fetchMyAppointment, fetchMyAppointmentAction } from "../saga";
import { GET_APPOINTMENTS } from "@/queries/patient/appointment";
import {
  FETCH_MY_APPOINTMENTS_FAILURE,
  FETCH_MY_APPOINTMENTS_REQUEST,
  FETCH_MY_APPOINTMENTS_SUCCESS,
} from "../constants";
import { ApolloQueryResult } from "@apollo/client";

jest.mock("@/apolloClient");

describe("fetchMyAppointment Saga", () => {
  const mockAction: fetchMyAppointmentAction = {
    type: FETCH_MY_APPOINTMENTS_REQUEST,
    payload: { userId: 1 },
  };

  it("should fetch appointments successfully", async () => {
    const mockResponse: ApolloQueryResult<any> = {
      data: {
        appointments: [
          {
            appointment_id: 1,
            appointment_date: "2025-02-25",
            patient_id: 1,
            start_time: "10:00 AM",
            end_time: "11:00 AM",
            patient_time_zone: "UTC",
            status: "confirmed",
            user: {
              name: "John Doe",
              email: "john@example.com",
              phone_number: "1234567890",
            },
          },
        ],
      },
      loading: false,
      networkStatus: 7,
      errors: undefined,
    };

    jest.spyOn(client, "query").mockResolvedValue(mockResponse);

    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchMyAppointment,
      mockAction
    ).toPromise();

    expect(client.query).toHaveBeenCalledWith({
      query: GET_APPOINTMENTS,
      variables: mockAction.payload,
    });

    expect(dispatched).toContainEqual({
      type: FETCH_MY_APPOINTMENTS_SUCCESS,
      payload: mockResponse,
    });
  });

  it("should handle errors properly", async () => {
    const mockError = new Error("Failed to fetch appointments");

    jest.spyOn(client, "query").mockRejectedValue(mockError);

    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchMyAppointment,
      mockAction
    ).toPromise();

    expect(client.query).toHaveBeenCalledWith({
      query: GET_APPOINTMENTS,
      variables: mockAction.payload,
    });

    expect(dispatched).toContainEqual({
      type: FETCH_MY_APPOINTMENTS_FAILURE,
      payload: mockError,
    });
  });
});
