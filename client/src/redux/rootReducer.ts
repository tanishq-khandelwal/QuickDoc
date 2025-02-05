// rootReducer.ts
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducers'; // Import your authReducer or any other reducers here
import availabiltyReducer from './reducers/doctor/availabilityReducers';
import doctorlistReducer from './reducers/patient/doctorlistReducers';
import doctorAvailabilityReducer from './reducers/patient/doctorAvailabilityReducer';
import bookAppointmentReducer from './reducers/patient/bookAppointmentReducer';
import appointmentReducer from './reducers/doctor/fetchAppointmentReducer';
import MyappointmentReducer from './reducers/patient/MyAppointmentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  doctoravailabilty:availabiltyReducer, // Combine your reducers here
  doctor:doctorlistReducer,
  availability:doctorAvailabilityReducer,
  bookAppointment:bookAppointmentReducer,
  allAppointments:appointmentReducer,
  myAppointments:MyappointmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // This infers the state shape

export default rootReducer;
