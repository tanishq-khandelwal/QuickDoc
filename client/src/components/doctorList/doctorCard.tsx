import React from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
  doctor: {
    doctor_id: number;
    user: { name: string };
    specialization: string;
    experience_years: number;
    city: string;
    clinic_address: string;
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      key={doctor.doctor_id}
      className="bg-white border-2 shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row w-full cursor-pointer hover:shadow-xl transition mt-4"
    >
      {/* Doctor Avatar */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-gray-400 border border-gray-300 rounded-full mx-auto sm:mx-0">
        <User size={62} className="text-white" />
      </div>

      {/* Doctor Info */}
      <div className="flex-1 mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
        <h2 className="font-bold text-lg sm:text-xl text-indigo-600">{doctor.user.name}</h2>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Specialization: {doctor.specialization}
        </p>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Experience: {doctor.experience_years} years
        </p>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">City: {doctor.city}</p>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Clinic Address: {doctor.clinic_address}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:items-center justify-center gap-3 mt-4 sm:mt-0">
        <button
          className="px-4 py-2 bg-[#199ED8] text-white rounded-md shadow-md hover:bg-[#1778A8] transition text-sm sm:text-base"
          onClick={() => navigate(`/doctorPreview?doctorId=${doctor.doctor_id}`)}
        >
          Book Appointment
        </button>
        <button
          disabled={true}
          className="px-4 py-2 bg-white text-blue-800 border-gray-400 border-2 rounded-md hover:bg-gray-100 transition text-sm sm:text-base hover:cursor-not-allowed"
        >
          Contact Clinic
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
