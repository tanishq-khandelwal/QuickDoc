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

     </Routes>
    </>
  );
}

export default App;
