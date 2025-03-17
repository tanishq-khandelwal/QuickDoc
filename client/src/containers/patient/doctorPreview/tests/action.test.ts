import {  
    FETCH_DOCTOR_AVAILABILTY_FAILURE,  
    FETCH_DOCTOR_AVAILABILTY_REQUEST,  
    FETCH_DOCTOR_AVAILABILTY_SUCCESS  
  } from "../constants";  
  import {  
    fetchDoctorAvailabilty,  
    fetchDoctorAvailabiltySuccess,  
    fetchDoctorAvailabiltyFailure,  
  } from "../actions";  
  
  describe("fetchDoctorAvailability Actions", () => {  

    beforeEach(() => {
        jest.clearAllMocks();
      });

      
    it("should create an action to request doctor availability", () => {  
      const doctorId = 123;  
      const expectedAction = {  
        type: FETCH_DOCTOR_AVAILABILTY_REQUEST,  
        payload: { doctorId },  
      };  
      expect(fetchDoctorAvailabilty(doctorId)).toEqual(expectedAction);  
    });  
  
    it("should create an action to handle successful doctor availability fetch", () => {  
      const mockData = {  
        availableSlots: ["10:00 AM", "11:00 AM"],  
        doctorId: 123,  
      };  
      const expectedAction = {  
        type: FETCH_DOCTOR_AVAILABILTY_SUCCESS,  
        payload: mockData,  
      };  
      expect(fetchDoctorAvailabiltySuccess(mockData)).toEqual(expectedAction);  
    });  
  
    it("should create an action to handle failure in fetching doctor availability", () => {  
      const expectedAction = {  
        type: FETCH_DOCTOR_AVAILABILTY_FAILURE,  
      };  
      expect(fetchDoctorAvailabiltyFailure()).toEqual(expectedAction);  
    });  
  });
  