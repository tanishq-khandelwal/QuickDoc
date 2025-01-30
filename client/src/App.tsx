import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Availability from "./pages/Availability";

function App() {
  return (
    <>
     <Routes>

      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/events" element={<Events/>}></Route>
      <Route path="/availability" element={<Availability/>}></Route>
     </Routes>
    </>
  );
}

export default App;
