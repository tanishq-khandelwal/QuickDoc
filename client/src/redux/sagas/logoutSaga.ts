import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGOUT_REQUEST, logoutSuccess, logoutFailure } from '../actions/authActions';
import axios from 'axios';

// Function to call the logout API (if you have one)
const logoutAPI = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/logout', {}, {
      withCredentials: true, // Assuming your backend uses cookies for authentication
    });
    console.log("Logout API Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Logout API Error:", error.response?.data || error.message);
    throw error.response ? error.response.data : 'Network Error';
  }
};

// Saga Worker for Logout
function* logoutSaga() {
  try {
    // Optional: If you want to perform any API call to invalidate the session on the server
    yield call(logoutAPI);

    // Clear session data from localStorage
    localStorage.clear();

    yield put(logoutSuccess()); // Dispatch logout success action
    // Redirect to login page after successful logout (optional)
    // window.location.href = '/login'; // Adjust this to your app's login URL
  } catch (error: any) {
    yield put(logoutFailure(error.message || "Logout failed"));
  }
}

// Watcher Saga for Logout
export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}
