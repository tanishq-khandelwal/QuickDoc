import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/doctor/Homepage";
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

function App() {
  return (
    <>
     <Routes>

      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/signup" element={<SignupSelection/>}></Route>
      <Route path="/signup/doctor" element={<Signup/>}></Route>
      <Route path="/doctor/profile" element={<Profile/>}></Route>
      <Route path="/signup/patient" element={<SignupPatient/>}></Route>
      <Route path="/appointments" element={<Appointments/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/events" element={<Events/>}></Route>
      <Route path="/availability" element={<Availability/>}></Route>
      <Route path="/doctors" element={<DoctorList/>}></Route>
      <Route path="/doctorPreview" element={<DoctorPreview/>}></Route>

     </Routes>
    </>
  );
}

export default App;
