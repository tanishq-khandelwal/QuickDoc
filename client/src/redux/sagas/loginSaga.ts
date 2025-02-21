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

function* loginSaga(action: { type: string; payload: LoginCredentials }) {
  try {
    const response: LoginResponse = yield call(loginAPI, action.payload);
    // console.log("response is "+response);
    const {role} = response.data;

    if (role) {
      localStorage.setItem("user",JSON.stringify(response.data)); 
      localStorage.setItem("role", role);
      localStorage.setItem("isLoggedIn","true");
    }

    yield put(loginSuccess(response.data)); 
  } catch (error: any) {
    console.error("Login error:", error); 
    yield put(loginFailure(error.message || "Login failed")); 
  }
}

export function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
