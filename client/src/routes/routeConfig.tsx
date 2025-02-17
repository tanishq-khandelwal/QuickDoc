import { lazy } from 'react';

const Signup = lazy(() => import("../pages/doctor/Signup"));
const SignupPatient = lazy(() => import("../pages/patient/Signup"));
const Login = lazy(() => import("../pages/Login"));
const Events = lazy(() => import("../pages/doctor/Events"));
const Availability = lazy(() => import("../pages/doctor/Availability"));
const SignupSelection = lazy(() => import("../pages/SignupSelection"));
const Profile = lazy(() => import("../pages/doctor/Profile"));
const Appointments = lazy(() => import("../pages/doctor/Appointments"));
const DoctorList = lazy(() => import("../pages/patient/DoctorList"));
const DoctorPreview = lazy(() => import("../pages/patient/DoctorPreview"));
const MyAppointments = lazy(() => import("../pages/patient/Appointments"));
const Homepage = lazy(() => import("../pages/Homepage"));
const PatientProfile = lazy(() => import("../pages/patient/Profile"));
const SuccessPage = lazy(() => import("@/stripe/SuccessPage"));
const FailurePage = lazy(() => import("@/stripe/FailurePage"));

export const publicRoutes = [
  { path: "/", element: <Homepage /> },
  { path: "/signup", element: <SignupSelection /> },
  { path: "/signup/doctor", element: <Signup /> },
  { path: "/signup/patient", element: <SignupPatient /> },
  { path: "/login", element: <Login /> },
  { path: "/events", element: <Events /> },
  { path: "/success", element: <SuccessPage /> },
  { path: "/cancel", element: <FailurePage /> }
];

export const doctorRoutes = [
  { path: "/doctor/profile", element: <Profile /> },
  { path: "/availability", element: <Availability /> },
  { path: "/appointments", element: <Appointments /> },
];

export const patientRoutes = [
  { path: "/doctors", element: <DoctorList /> },
  { path: "/doctorPreview", element: <DoctorPreview /> },
  { path: "/appointments/me", element: <MyAppointments /> },
  { path: "/patient/profile/:id", element: <PatientProfile /> },
];
