import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {SIGNUP_REQUEST, signupSuccess, signupFailure} from '../../actions/authActions';

// Define Types for the Login Credentials and Response
type SignupCredentials={
    name:string,
    email:string,
    password: string,
    phone_number:string,
    role:string,
}

type SignupResponse= {
  data: Array<{
    user_id: number;
    __typename: string;
  }>;
}

// Function to call the actual login API
const signupAPI = async (credentials: SignupCredentials): Promise<SignupResponse> => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/register', credentials,{
        withCredentials:true,
    });
    console.log("response is"+response.data);
    return response.data; // Assuming API returns user data
  } catch (error: any) {
    console.error("API Error:", error.response?.data); // Debugging
    throw error.response ? error.response.data : 'Network Error';
  }
};

// Saga Worker Function
function* signupSaga(action: { type: string; payload: SignupCredentials }) {
  try {
    const response: SignupResponse = yield call(signupAPI, action.payload);
    console.log("response is "+response.data);
    // const {role} = response.data; // Destructure user_id and role from response.data

    // // Store the user ID and role in localStorage after a successful login
    // if (role) {
    //   localStorage.setItem("user",JSON.stringify(response.data)); // Convert user_id to string
    //   localStorage.setItem("role", role); // Store the role as string
    //   localStorage.setItem("isLoggedIn","true");
    // }

    yield put(signupSuccess(response)); // Dispatch success action with the user data
  } catch (error: any) {
    console.error("Login error:", error); // Debugging
    yield put(signupFailure(error.message || "Failed to Register User")); // Extract error message
  }
}

// Watcher Saga
export function* watchSignupSaga() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
}
