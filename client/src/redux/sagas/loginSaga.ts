import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../actions/authActions';

// Define Types for the Login Credentials and Response
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    user_id: number;
    role: string;
  };
}

// Function to call the actual login API
const loginAPI = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/login', credentials,{
        withCredentials:true,
    });
    return response.data; // Assuming API returns user data
  } catch (error: any) {
    throw error.response ? error.response.message : 'Network Error';
  }
};

// Saga Worker Function
function* loginSaga(action: { type: string; payload: LoginCredentials }) {
  try {
    const response: LoginResponse = yield call(loginAPI, action.payload);
    const { user_id, role } = response.data; // Destructure user_id and role from response.data

    // Store the user ID and role in localStorage after a successful login
    if (user_id && role) {
      localStorage.setItem("userId", user_id.toString()); // Convert user_id to string
      localStorage.setItem("role", role); // Store the role as string
    }

    yield put(loginSuccess(response.data)); // Dispatch success action with the user data
  } catch (error: any) {
    yield put(loginFailure(error)); // Dispatch failure action
  }
}

// Watcher Saga
export function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
