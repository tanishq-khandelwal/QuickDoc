import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import ProfileContainer from "@/containers/doctor/profile";

const ProfilePage = () => {
  return (
    <Layout>
      <Navbar />
      <ProfileContainer />
    </Layout>
  );
};

export default ProfilePage;