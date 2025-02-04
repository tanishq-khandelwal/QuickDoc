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
      <div className="container mt-10">
        <h1 className="text-3xl font-semibold mb-6">Doctor List</h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for doctors..."
            className="px-4 py-2 border rounded-md w-full max-w-[50rem] focus:outline-none focus:ring-2 focus:ring-indigo-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Doctor Cards */}
        <div className="flex flex-wrap px-6 gap-4">
          {filteredDoctors.length === 0 && loading ? (
            <div className="col-span-3 text-center text-xl text-gray-500">
              No doctors found.
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.doctor_id}
                className="bg-white border-2 shadow-md rounded-lg p-6 flex  w-full cursor-pointer hover:shadow-xl "
              >
                {/* Doctor Avatar */}
                <div className="h-full px-10 flex items-center bg-gray-400 border-gray-300 border-1 rounded-full">
                  <User size={62} className="text-white" />
                </div>

                {/* Doctor Info */}
                <div className="flex-1 ml-4">
                  <h2 className="font-bold text-xl text-indigo-600">
                    {doctor.user.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Specialization: {doctor.specialization}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Experience: {doctor.experience_years} years
                  </p>
                  <p className="text-gray-600 mt-1">City: {doctor.city}</p>
                  <p className="text-gray-600 mt-1">
                    Clinic Address: {doctor.clinic_address}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center justify-center gap-3">
                  <button className="px-4 py-2 bg-[#199ED8] text-white rounded-md shadow-md hover:bg-[#1778A8] transition" onClick={() => handleDoctorClick(doctor.doctor_id)}>
                    Book Appointment
                  </button>
                  <button className="px-8 py-2 bg-white text-blue-800 border-gray-400 border-2 rounded-md hover:bg-gray-100 transition">
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
