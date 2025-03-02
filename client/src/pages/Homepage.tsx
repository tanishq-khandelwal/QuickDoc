import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import Footer from "../components/footer/Footer";
import SearchSection from "@/components/Homepage/searchSection";
import ServicesSection from "@/components/Homepage/servicesSection";
import SpecialitiesSection from "@/components/Homepage/specalitiesSection";
import DoctorsSection from "@/components/Homepage/doctorSection";

const Homepage = () => {
  return (
    <Layout>
      <Navbar />
      <div className="mt-16">
        <SearchSection />
        <ServicesSection />
        <SpecialitiesSection />
        <DoctorsSection />
      </div>
      <Footer />
    </Layout>
  );
};

export default Homepage;