import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./sagas/loginSaga";
import { watchFetchAvailability } from "./sagas/doctor/availabilitySaga";
import { watchLogoutSaga } from "./sagas/logoutSaga";
import { watchSignupSaga } from "./sagas/patient/signupSaga";
import { watchFetchDoctors } from "./sagas/patient/doctorlistSaga.";
import { watchDoctorAvailabilty } from "./sagas/patient/doctorAvailabilitySaga";
import { watchBookAppointment } from "./sagas/patient/bookAppointmentSaga";
import { watch } from "fs";
import { watchFetchAppointment } from "./sagas/doctor/fetchAppointmentSaga";

export default function* rootSaga() {
    yield all([
      watchFetchAvailability(),
      watchAuthSaga(),
      watchLogoutSaga(),
      watchSignupSaga(),
      watchFetchDoctors(),
      watchDoctorAvailabilty(),
      watchBookAppointment(),
      watchFetchAppointment(),
      // Add other watchers here
    ]);
  }