import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../actions/authActions';

// Define Types for the Login Credentials and Response
type LoginCredentials={
  email: string;
  password: string;
}

type LoginResponse= {
  data: {
    user_id: number;
    role: string;
    name:string;
    doctorId:number
  };
}

// Function to call the actual login API
const loginAPI = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/login', credentials,{
        withCredentials:true,
    });
    console.log("response is"+response);
    return response.data; // Assuming API returns user data
  } catch (error: any) {
    console.error("API Error:", error.response?.data); // Debugging
    throw error.response ? error.response.data : 'Network Error';
  }
};

// Saga Worker Function
function* loginSaga(action: { type: string; payload: LoginCredentials }) {
  try {
    const response: LoginResponse = yield call(loginAPI, action.payload);
    // console.log("response is "+response);
    const { user_id, role} = response.data; // Destructure user_id and role from response.data

    // Store the user ID and role in localStorage after a successful login
    if (user_id && role) {
      localStorage.setItem("userId", user_id.toString()); // Convert user_id to string
      localStorage.setItem("role", role); // Store the role as string
      localStorage.setItem("isLoggedIn","true");
    }

    yield put(loginSuccess(response.data)); // Dispatch success action with the user data
  } catch (error: any) {
    console.error("Login error:", error); // Debugging
    yield put(loginFailure(error.message || "Login failed")); // Extract error message
  }
}

// Watcher Saga
export function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
