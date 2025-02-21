import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import AppointmentsContainer from "@/containers/doctor/appointments";

const Appointments = () => (
  <Layout>
    <Navbar />
    <AppointmentsContainer />
  </Layout>
);

export default Appointments;
