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
  
  const DoctorsSection = () => {
    return (
      <div className="mt-16 px-6 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold font-sans">Book an appointment for an in-clinic consultation</h2>
          <h2 className="text-lg text-gray-500 font-sans">Find experienced doctors across all specialties</h2>
        </div>
        <div className="flex gap-8 justify-center mt-4">
          {doctors.map(({ id, url, title, desc }) => (
            <div key={id} className="rounded-3xl hover:text-[#14BEF0] cursor-pointer transition">
              <img src={url} alt={title} className="w-full h-48 object-fill rounded-tr-2xl rounded-tl-2xl pt-2" />
              <div className="p-2 bg-white">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="font-sans font-normal text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default DoctorsSection;