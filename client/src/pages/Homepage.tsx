import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import Footer from "./Footer";
import SearchSection from "@/components/Homepage/searchSection/searchSection";
import ServicesSection from "@/components/Homepage/servicesSection/servicesSection";
import SpecialitiesSection from "@/components/Homepage/specalitiesSection/specalitiesSection";
import DoctorsSection from "@/components/Homepage/doctorSection/doctorSection";

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