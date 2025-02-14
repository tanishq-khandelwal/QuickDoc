import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { fetchDoctors } from "@/redux/actions/patient/doctorListAction";
import { RootState } from "@/redux/rootReducer";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const { doctors, loading, error } = useSelector(
    (state: RootState) => state.doctor
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDoctorClick = (doctor_id:number) => {
    navigate(`/doctorPreview?doctorId=${doctor_id}`);
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) toast.error(`Loading failed: ${error}`);
    }
  }, [loading, error]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors =
    doctors?.filter((doctor) =>
      doctor?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  
    return (
      <Layout>
        <Navbar />
        <div className="container mx-auto mt-10 px-4">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left">Doctor List</h1>
    
          {/* Search Bar */}
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Search for doctors..."
              className="px-4 py-2 border rounded-md w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-[50rem] focus:outline-none focus:ring-2 focus:ring-indigo-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
     
          {/* Doctor Cards */}
          <div className="sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.length === 0 && loading ? (
              <div className="col-span-full text-center text-xl text-gray-500">
                
              </div>
            ) : (
              filteredDoctors.map((doctor) => (
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
                    <h2 className="font-bold text-lg sm:text-xl text-indigo-600">
                      {doctor.user.name}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Specialization: {doctor.specialization}
                    </p>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Experience: {doctor.experience_years} years
                    </p>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      City: {doctor.city}
                    </p>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Clinic Address: {doctor.clinic_address}
                    </p>
                  </div>
    
                  {/* Actions */}
                  <div className="flex flex-col sm:items-center justify-center gap-3 mt-4 sm:mt-0">
                    <button
                      className="px-4 py-2 bg-[#199ED8] text-white rounded-md shadow-md hover:bg-[#1778A8] transition text-sm sm:text-base"
                      onClick={() => handleDoctorClick(doctor.doctor_id)}
                    >
                      Book Appointment
                    </button>
                    <button
                      className="px-4 py-2 bg-white text-blue-800 border-gray-400 border-2 rounded-md hover:bg-gray-100 transition text-sm sm:text-base"
                    >
                      Contact Clinic
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Layout>
    );
    
};

export default DoctorList;
