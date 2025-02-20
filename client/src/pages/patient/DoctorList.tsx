import React from "react";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import DoctorListContainer from "@/containers/patient/doctors";

const DoctorListPage: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <DoctorListContainer />
    </Layout>
  );
};

export default DoctorListPage;
