// rootReducer.ts
import { combineReducers } from 'redux';
import authReducer from '../redux/reducers/authReducers'; // Import your authReducer or any other reducers here

const rootReducer = combineReducers({
  auth: authReducer, // Combine your reducers here
});

export type RootState = ReturnType<typeof rootReducer>; // This infers the state shape

export default rootReducer;
