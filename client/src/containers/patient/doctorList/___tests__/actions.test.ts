import {
  fetchDoctors,
  fetchDoctorsSuccess,
  fetchDoctorsFailure,
} from "../actions";
import {
  FETCH_DOCTORS_FAILURE,
  FETCH_DOCTORS_REQUEST,
  FETCH_DOCTORS_SUCCESS,
} from "../constants";

describe("Doctors Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetchDoctors should create an action to fetch doctors", () => {
    const expectedAction = { type: FETCH_DOCTORS_REQUEST };
    expect(fetchDoctors()).toEqual(expectedAction);
  });

  test("fetchDoctorsSuccess should create an action with payload", () => {
    const payload = [{ id: 1, name: "Dr. John Doe" }];
    const expectedAction = { type: FETCH_DOCTORS_SUCCESS, payload };
    expect(fetchDoctorsSuccess(payload)).toEqual(expectedAction);
  });

  test("fetchDoctorsFailure should create an action for fetch failure", () => {
    const expectedAction = { type: FETCH_DOCTORS_FAILURE };
    expect(fetchDoctorsFailure()).toEqual(expectedAction);
  });
});
