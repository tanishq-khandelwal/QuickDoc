import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { Search } from "lucide-react";
import Footer from "../Footer";

const Homepage = () => {
  const services = [
    {
      id: 1,
      title: "Instant Video Consultation",
      desc: "Connect within 60 secs",
      url: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_instant_video_consulation.png",
      bgcolor: "#AECEED",
    },
    {
      id: 2,
      title: "Find Doctors Near You",
      desc: "Confirmed appointments",
      url: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_surgeries.png",
      bgcolor: "#98CAD7",
    },
    {
      id: 3,
      title: "Surgeries",
      desc: "Safe and trusted surgery centers",
      url: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png",
      bgcolor: "#D5D9FD",
    },
  ];

  const specialities = [
    {
      id: 1,
      title: "Period doubts or Pregnancy",
      url: "https://www.practostatic.com/consult/consult-home/symptoms_icon/irregular-painful+period.png",
    },
    {
      id: 2,
      title: "Acne, pimple or skin issues",
      url: "https://www.practostatic.com/consult/consult-home/symptoms_icon/Acne.png",
    },
    {
      id: 3,
      title: "Performance issues in bed",
      url: "https://www.practo.com/consult/static/images/top-speciality-sexology.svg",
    },
    {
      id: 4,
      title: "Cold, cough or fever",
      url: "https://www.practostatic.com/consult/consult-home/symptoms_icon/coughing.png",
    },
    {
      id: 5,
      title: "Child not feeling well",
      url: "https://www.practo.com/consult/static/images/top-speciality-pediatric.svg",
    },
    {
      id: 6,
      title: "Depression or anxiety",
      url: "https://www.practostatic.com/acred/search-assets/2/12-mental-wellness.png",
    },
  ];

  const doctors = [
    {
      id: 1,
      title: "Dentist",
      desc: "Teething troubles?Schedule a dental checkup",
      url: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dentist@2x.jpg",
    },
    {
      id: 2,
      title: "Gynecologist",
      desc: "Explore for women's health,pregnancy and infertility treatments",
      url: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-gynecologist@2x.jpg",
    },
    {
      id: 3,
      title: "Dietitian/Nutrition",
      desc: "Get guidance on eathing right,weight management",
      url: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dietitian@2x.jpg",
    },
    {
      id: 4,
      title: "Physiotherapist",
      desc: "Pulled a muscle?Get it treated by trained physiotherapist",
      url: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-physiotherapist@2x.jpg",
    },
  ];
  return (
    <Layout>
      <Navbar />
      <div className="mt-16">
        <div className="p-6 max-w-6xl mx-auto mt-16">
          {/* Search Section Start*/}
          <div className="flex mb-6">
            <Input placeholder="Search location" className="w-1/3 rounded-none border border-gray-500 border-r-0  focus:border-none" />
            <Input
              placeholder="Search doctors, clinics, hospitals, etc."
              className="w-1/4 rounded-none border border-gray-500 focus:border-none"
            />

          </div>
        </div>
        {/* Search Section End */}

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(({ id, url, title, desc, bgcolor }) => (
              <div
                key={id}
                style={{ backgroundColor: bgcolor }}
                className="border rounded-3xl shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={url}
                  alt={title}
                  className="w-full h-48 object-contain rounded-lg pt-2 "
                />
                <div className="p-4 border-t-2 bg-white">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="font-sans font-normal text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section Starts */}
        <div className="mt-16 px-6 max-w-6xl mx-auto">
          <div className="ml-4">
            <h2 className="text-2xl font-bold">
              Consult top doctors online for any health concern
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center  p-6 rounded-lg">
            <span className="text-gray-700 text-center md:text-left max-w-lg">
              Private online consultations with verified doctors in all
              specialties
            </span>
            <Button className="mt-4 md:mt-0 text-[#14BEF0] border-2 border-[#14BEF0] bg-white">
              View All Specialties
            </Button>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex gap-8">
              {specialities.map(({ id, url, title }) => (
                <div key={id}>
                  <img
                    src={url}
                    alt={title}
                    className="w-full h-28 object-contain rounded-lg pt-2 "
                  />
                  <div className="p-4 flex flex-col items-center text-center">
                    <h3 className="text-base font-semibold text-gray-800">
                      {title}
                    </h3>
                    <h3 className="text-sm font-semibold text-blue-600 mt-2 cursor-pointer hover:underline">
                      CONSULT NOW
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Hero Section Ends */}

        {/* Services Section Starts */}
        <div className="mt-16 px-6 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold font-sans">
              Book an appointment for an in-clinic consultation
            </h2>
            <h2 className="text-lg text-gray-500 font-sans">
              Find experienced doctors across all specialties
            </h2>
          </div>

          <div className="flex justify-center items-center mt-4">
            <div className="flex gap-8">
              {doctors.map(({ id, url, title, desc }) => (
                <div
                  key={id}
                  className=" rounded-3xl hover:text-[#14BEF0] cursor-pointer transition"
                >
                  <img
                    src={url}
                    alt={title}
                    className="w-full h-48 object-fill rounded-tr-2xl rounded-tl-2xl pt-2 "
                  />
                  <div className="p-2 bg-white">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="font-sans font-normal text-gray-500">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Service Section Ends */}
      </div>

      <Footer />
    </Layout>
  );
};

export default Homepage;
