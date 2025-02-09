const services = [
    { id: 1, title: "Instant Video Consultation", desc: "Connect within 60 secs", url: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_instant_video_consulation.png", bgcolor: "#AECEED" },
    { id: 2, title: "Find Doctors Near You", desc: "Confirmed appointments", url: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_surgeries.png", bgcolor: "#98CAD7" },
    { id: 3, title: "Surgeries", desc: "Safe and trusted surgery centers", url: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png", bgcolor: "#D5D9FD" }
  ];
  
  const ServicesSection = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ id, url, title, desc, bgcolor }) => (
            <div key={id} style={{ backgroundColor: bgcolor }} className="border rounded-3xl shadow-lg hover:shadow-2xl transition">
              <img src={url} alt={title} className="w-full h-48 object-contain rounded-lg pt-2" />
              <div className="p-4 border-t-2 bg-white">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="font-sans font-normal text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default ServicesSection;
  