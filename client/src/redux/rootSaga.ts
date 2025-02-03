import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./sagas/loginSaga";
import { watchFetchAvailability } from "./sagas/doctor/availabilitySaga";
import { watchLogoutSaga } from "./sagas/logoutSaga";
import { watchSignupSaga } from "./sagas/patient/signupSaga";
import { watchFetchDoctors } from "./sagas/patient/doctorlistSaga.";

export default function* rootSaga() {
    yield all([
      watchFetchAvailability(),
      watchAuthSaga(),
      watchLogoutSaga(),
      watchSignupSaga(),
      watchFetchDoctors()
      // Add other watchers here
    ]);
  }