import { 
    FETCH_MY_APPOINTMENTS_FAILURE, 
    FETCH_MY_APPOINTMENTS_REQUEST, 
    FETCH_MY_APPOINTMENTS_SUCCESS 
  } from "../constants";
  
  import { 
    fetchMyAppointments, 
    fetchMyAppointmentsSuccess, 
    fetchMyAppointmentsFailure 
  } from "../actions";
  
  describe("Appointment Actions", () => {
    it("should create an action to fetch appointments", () => {
      const userId = 123;
      const expectedAction = {
        type: FETCH_MY_APPOINTMENTS_REQUEST,
        payload: { userId },
      };
  
      expect(fetchMyAppointments(userId)).toEqual(expectedAction);
    });
  
    it("should create an action for successful appointments fetch", () => {
      const mockResponse = { data: "mock data" };
      const expectedAction = {
        type: FETCH_MY_APPOINTMENTS_SUCCESS,
        payload: mockResponse,
      };
  
      expect(fetchMyAppointmentsSuccess(mockResponse)).toEqual(expectedAction);
    });
  
    it("should create an action for failed appointments fetch", () => {
      const expectedAction = {
        type: FETCH_MY_APPOINTMENTS_FAILURE,
      };
  
      expect(fetchMyAppointmentsFailure()).toEqual(expectedAction);
    });
  });
  