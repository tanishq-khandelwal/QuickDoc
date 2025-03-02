import { MapPin, Search } from "lucide-react";
import { useState, useEffect } from "react";

const SearchSection = () => {
  const [location, setLocation] = useState<string>("");

  console.log(location)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setLocation(data.address.county || data.address.state_district || "Unknown Location");
            // console.log(data);
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Location unavailable");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Location permission denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto mt-16">
      <div className="flex mb-6">
        <div className="relative w-1/3">
          <MapPin className="absolute left-3 top-3 text-[#404147]" size={20} />
          <input
            placeholder="Search location"
            className="w-full border-2 border-[#B5B5BE] border-r-0 p-2 pl-10 rounded-sm rounded-tr-none rounded-br-none outline-none text-[#404147]"
            value={location}
          />
        </div>

        <div className="relative w-full">
        <Search className="absolute left-3 top-3 text-[#404147]" size={20} /> 
        <input
          placeholder="Search doctors, clinics, hospitals, etc."
          className="pl-10 w-1/2 border-2 border-[#B5B5BE] p-2 rounded-sm rounded-tl-none rounded-bl-none outline-none text-[#757474]"
        />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
