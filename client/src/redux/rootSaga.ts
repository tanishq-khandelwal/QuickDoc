import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./sagas/loginSaga";
import { watchFetchAvailability } from "./sagas/doctor/availabilitySaga";
import { watchLogoutSaga } from "./sagas/logoutSaga";
import { watchSignupSaga } from "./sagas/patient/signupSaga";
import { watchFetchDoctors } from "./sagas/patient/doctorlistSaga.";
import { watchDoctorAvailabilty } from "./sagas/patient/doctorAvailabilitySaga";
import { watchBookAppointment } from "./sagas/patient/bookAppointmentSaga";
import { watchFetchAppointment } from "./sagas/doctor/fetchAppointmentSaga";
import { watchFetchMyAppointment } from "./sagas/patient/MyAppointmentSaga";
import { watchUpdateAppointment } from "./sagas/doctor/updateAppointmentSaga";

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
      watchFetchMyAppointment(),
      watchUpdateAppointment(),
      // Add other watchers here
    ]);
  }