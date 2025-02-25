// rootReducer.ts
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducers'; // Import your authReducer or any other reducers here
import availabiltyReducer from './reducers/doctor/availabilityReducers';
import doctorlistReducer from '../containers/patient/doctorList/reducers';
import doctorAvailabilityReducer from '../containers/patient/doctorPreview/reducers';
import bookAppointmentReducer from './reducers/patient/bookAppointmentReducer';
import appointmentReducer from '@/containers/doctor/appointments/reducers'
import MyappointmentReducer from '../containers/patient/appointments/reducers';
import updateAppointmentReducer from '@/containers/doctor/appointments/updateAppointmentReducer';
import ExceptionavailabiltyReducer from './reducers/doctor/exceptionAvailabilityReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  doctoravailabilty:availabiltyReducer, // Combine your reducers here
  doctor:doctorlistReducer,
  availability:doctorAvailabilityReducer,
  bookAppointment:bookAppointmentReducer,
  allAppointments:appointmentReducer,
  myAppointments:MyappointmentReducer,
  updateAppointment:updateAppointmentReducer,
  exceptionAvailability:ExceptionavailabiltyReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // This infers the state shape

export default rootReducer;
