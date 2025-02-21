import { User } from "lucide-react";

const DoctorProfile = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col items-center md:flex-row justify-center bg-white border-2 shadow-md rounded-lg p-4 sm:p-6 w-full">
      <div className="w-28 h-28 flex justify-center items-center bg-gray-400 border border-gray-300 rounded-full">
        <User size={40} className="text-white" />
      </div>

      <div className="flex-1 ml-4">
        <h2 className="font-bold text-xl text-indigo-600">
          {data?.user?.name || "Unknown Doctor"}
        </h2>
        <p className="text-gray-600 mt-1">Specialization: {data?.specialization || "N/A"}</p>
        <p className="text-gray-600 mt-1">Experience: {data?.experience_years || 0} years</p>
        <p className="text-gray-600 mt-1">City: {data?.city || "Unknown"}</p>
        <p className="text-gray-600 mt-1">Clinic Address: {data?.clinic_address || "Not Available"}</p>
      </div>

      <div className="text-gray-600 mt-4 md:mt-0 justify-center items-center">
        <div className="flex gap-2">
          <p className="text-sm">Consultation Fee:</p>
          <p className="text-medium font-semibold text-green-700">₹{data?.consultation_fee || 0}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-sm">Slot Duration:</p>
          <p className="text-sm text-red-700">{data?.slot_duration} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
