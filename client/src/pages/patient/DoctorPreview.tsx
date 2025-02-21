import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import DoctorPreviewContainer from "@/containers/patient/doctorPreview";

const DoctorPreviewPage = () => {
  return (
    <Layout>
      <Navbar />
      <DoctorPreviewContainer />
    </Layout>
  );
};

export default DoctorPreviewPage;
