import { Input } from "@/components/ui/input";

const SearchSection = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto mt-16">
      <div className="flex mb-6">
        <Input placeholder="Search location" className="w-1/3 rounded-none border border-gray-500 border-r-0" />
        <Input placeholder="Search doctors, clinics, hospitals, etc." className="w-1/4 rounded-none border border-gray-500" />
      </div>
    </div>
  );
};
export default SearchSection;