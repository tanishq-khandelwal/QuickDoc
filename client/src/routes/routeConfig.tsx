import Signup from "../pages/doctor/Signup";
import SignupPatient from "../pages/patient/Signup";
import Login from "../pages/Login";
import Events from "../pages/doctor/Events";
import Availability from "../pages/doctor/Availability";
import SignupSelection from "../pages/SignupSelection";
import Profile from "../pages/doctor/Profile";
import Appointments from "../pages/doctor/Appointments";
import DoctorList from "../pages/patient/DoctorList";
import DoctorPreview from "../pages/patient/DoctorPreview";
import MyAppointments from "../pages/patient/Appointments";
import Homepage from "../pages/Homepage";

export const publicRoutes = [
  { path: "/", element: <Homepage /> },
  { path: "/signup", element: <SignupSelection /> },
  { path: "/signup/doctor", element: <Signup /> },
  { path: "/signup/patient", element: <SignupPatient /> },
  { path: "/login", element: <Login /> },
  { path: "/events", element: <Events /> },
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
];
