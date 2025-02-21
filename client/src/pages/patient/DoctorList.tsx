import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import DoctorListContainer from "@/containers/patient/doctorList";

const DoctorListPage = () => {
  return (
    <Layout>
      <Navbar />
      <DoctorListContainer />
    </Layout>
  );
};

export default DoctorListPage;
