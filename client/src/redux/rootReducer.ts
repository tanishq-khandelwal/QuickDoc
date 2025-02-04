// rootReducer.ts
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducers'; // Import your authReducer or any other reducers here
import appointmentReducer from './reducers/doctor/appointmentReducers';
import doctorlistReducer from './reducers/patient/doctorlistReducers';
import doctorAvailabilityReducer from './reducers/patient/doctorAvailabilityReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  appointment:appointmentReducer, // Combine your reducers here
  doctor:doctorlistReducer,
  availability:doctorAvailabilityReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // This infers the state shape

export default rootReducer;
