import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signup from "./pages/doctor/Signup";
import SignupPatient from "./pages/patient/Signup";
import Login from "./pages/Login";
import Events from "./pages/doctor/Events";
import Availability from "./pages/doctor/Availability";
import SignupSelection from "./pages/SignupSelection";
import Profile from "./pages/doctor/Profile";
import Appointments from "./pages/doctor/Appointments";
import DoctorList from "./pages/patient/DoctorList";
import DoctorPreview from "./pages/patient/DoctorPreview";
import MyAppointments from "./pages/patient/Appointments";
import ProtectedRoute from "./routes/protectedRoutes";
import NotFound from "./routes/notFound";
import AccessDenied from "./routes/denied";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes Start */}
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/signup" element={<SignupSelection />}></Route>
        <Route path="/signup/doctor" element={<Signup />}></Route>
        <Route path="/signup/patient" element={<SignupPatient />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* Public Routes End */}
        <Route path="/events" element={<Events />}></Route>

        {/* Doctor Routes Start */}
        <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
          <Route path="/doctor/profile" element={<Profile />}></Route>
          <Route path="/availability" element={<Availability />}></Route>
          <Route path="/appointments" element={<Appointments />}></Route>
        </Route>
        {/*Doctor Routes End  */}

        {/* Patient Routes Start */}
        <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
          <Route path="/doctors" element={<DoctorList />}></Route>
          <Route path="/doctorPreview" element={<DoctorPreview />}></Route>
          <Route path="/appointments/me" element={<MyAppointments />}></Route>
        </Route>
        {/*Patient Routes Ends  */}

        <Route path="*" element={<NotFound />} />
        <Route path="/denied" element={<AccessDenied />}></Route>
      </Routes>
    </>
  );
}

export default App;
