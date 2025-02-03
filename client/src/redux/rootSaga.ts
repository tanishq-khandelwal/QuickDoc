import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./sagas/loginSaga";
import { watchFetchAvailability } from "./sagas/doctor/availabilitySaga";
import { watchLogoutSaga } from "./sagas/logoutSaga";
import { watchSignupSaga } from "./sagas/patient/signupSaga";

export default function* rootSaga() {
    yield all([
      watchFetchAvailability(),
      watchAuthSaga(),
      watchLogoutSaga(),
      watchSignupSaga(),
      // Add other watchers here
    ]);
  }