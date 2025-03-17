import {
    APPOINTMENT_UPDATE_FAILURE,
    APPOINTMENT_UPDATE_REQUEST,
    APPOINTMENT_UPDATE_SUCCESS,
    FETCH_APPOINTMENTS_FAILURE,
    FETCH_APPOINTMENTS_REQUEST,
    FETCH_APPOINTMENTS_SUCCESS,
  } from "../constants";
  import {
    fetchAppointments,
    fetchAppointmentsSuccess,
    fetchAppointmentsFailure,
    updateApppointment,
    updateAppointmentSuccess,
    updateAppointmentFailure,
  } from "../actions";
  import { AppointmentType } from "../saga";
  
  describe("Appointment Actions", () => {
    it("should create fetchAppointments action", () => {
      const doctorId = 1;
      const expectedAction = {
        type: FETCH_APPOINTMENTS_REQUEST,
        payload: doctorId,
      };
      expect(fetchAppointments(doctorId)).toEqual(expectedAction);
    });
  
    it("should create fetchAppointmentsSuccess action", () => {
      const mockAppointments = [{ id: 1, status: "confirmed" }];
      const expectedAction = {
        type: FETCH_APPOINTMENTS_SUCCESS,
        payload: mockAppointments,
      };
      expect(fetchAppointmentsSuccess(mockAppointments)).toEqual(expectedAction);
    });
  
    it("should create fetchAppointmentsFailure action", () => {
      const expectedAction = {
        type: FETCH_APPOINTMENTS_FAILURE,
      };
      expect(fetchAppointmentsFailure()).toEqual(expectedAction);
    });
  
    it("should create updateAppointment action", () => {
      const appointmentData = { appointmentId: 2, status: "cancelled" };
      const expectedAction = {
        type: APPOINTMENT_UPDATE_REQUEST,
        payload: appointmentData,
      };
      expect(updateApppointment(appointmentData)).toEqual(expectedAction);
    });
  
    it("should create updateAppointmentSuccess action", () => {
      const mockAppointments: AppointmentType[] = [
        {   appointment_id: 1,
            appointment_date: "05-02-25",
            patient_id: 1,
            start_time: "09:00",
            end_time: "09:15",
            patient_time_zone: "UTC",
            status: "pending",
            user: {
              name: "Tanishq",
              email: "Tanishqkhandelwal2019@gmail.com",
              phone_number: "9011616611",
            },
        }
      ];
      const expectedAction = {
        type: APPOINTMENT_UPDATE_SUCCESS,
        payload: { appointments: mockAppointments },
      };
      expect(updateAppointmentSuccess(mockAppointments)).toEqual(expectedAction);
    });
  
    it("should create updateAppointmentFailure action", () => {
      const errorMessage = "Update failed";
      const expectedAction = {
        type: APPOINTMENT_UPDATE_FAILURE,
        error: errorMessage,
      };
      expect(updateAppointmentFailure(errorMessage)).toEqual(expectedAction);
    });
  });
  