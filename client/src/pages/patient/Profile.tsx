import PatientProfileContainer from "@/containers/patient/profile";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";

const PatientProfile = () => {
  return (
    <Layout>
      <Navbar />
      <PatientProfileContainer />
    </Layout>
  );
};

export default PatientProfile;
