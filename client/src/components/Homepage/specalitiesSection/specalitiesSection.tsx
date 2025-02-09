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


  
  const SpecialitiesSection = () => {
    return (
      <div className="mt-16 px-6 max-w-6xl mx-auto">
        <div className="ml-4">
          <h2 className="text-2xl font-bold">Consult top doctors online for any health concern</h2>
        </div>
        <div className="flex gap-8 justify-center mt-6">
          {specialities.map(({ id, url, title }) => (
            <div key={id} className="text-center">
              <img src={url} alt={title} className="w-full h-28 object-contain rounded-lg pt-2" />
              <h3 className="text-base font-semibold text-gray-800">{title}</h3>
              <h3 className="text-sm font-semibold text-blue-600 mt-2 cursor-pointer hover:underline">CONSULT NOW</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default SpecialitiesSection;