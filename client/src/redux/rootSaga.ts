import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./sagas/loginSaga";
import { watchFetchAvailability } from "@/containers/doctor/availability/saga";
import { watchLogoutSaga } from "./sagas/logoutSaga";
import { watchSignupSaga } from "./sagas/patient/signupSaga";
import { watchFetchDoctors } from "../containers/patient/doctorList/saga";
import { watchDoctorAvailabilty } from "../containers/patient/doctorPreview/sagas";
import { watchBookAppointment } from "./sagas/patient/bookAppointmentSaga";
import { watchFetchAppointment } from "@/containers/doctor/appointments/saga"
import { watchFetchMyAppointment } from "../containers/patient/appointments/saga";
import { watchUpdateAppointment } from "@/containers/doctor/appointments/updateAppointmentSaga";
import { watchFetchExceptionAvailability } from "./sagas/doctor/exceptionAvailibilitySaga";

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
      watchFetchExceptionAvailability(),
      // Add other watchers here
    ]);
  }