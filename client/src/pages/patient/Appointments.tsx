import MyAppointmentsContainer from "@/containers/patient/appointments";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";


const MyAppointments = () => {
  return (
    <Layout>
      <Navbar />
      <MyAppointmentsContainer />
    </Layout>
  );
};

export default MyAppointments;
