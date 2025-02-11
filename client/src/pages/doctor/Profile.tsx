import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { GET_DOCTOR_PROFILE } from "@/queries/doctor/profile";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const userData = localStorage.getItem("user");
  const doctorId = userData ? JSON.parse(userData).doctorId : null;

  const { data, loading, error } = useQuery(GET_DOCTOR_PROFILE, {
    variables: { doctorId },
  });

  useEffect(() => {
    if (loading) {
      toast.loading("Loading profile...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (error) {
        toast.error(`An error occurred: ${error.message}`);
      }
    }
  }, [loading, error]);

  const doctor = data?.doctors?.[0];

  return (
    <Layout>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white mt-16">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
          <h1 className="text-2xl font-bold text-center mb-6">
            Doctor Profile
          </h1>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : doctor ? (
            <form className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={doctor.user.name}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={doctor.user.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={doctor.user.phone_number}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Experience Years
                </label>
                <input
                  type="number"
                  value={doctor.experience_years}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  value={doctor.specialization}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Slot Duration (minutes)
                </label>
                <input
                  type="number"
                  value={doctor.slot_duration}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Consultation Fee
                </label>
                <input
                  type="text"
                  value={`₹${doctor.consultation_fee}`}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={doctor.city}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Clinic Address
                </label>
                <textarea
                  value={doctor.clinic_address}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                ></textarea>
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  Edit Profile
                </button>
              </div>
            </form>
          ) : (
            <p className="text-center text-gray-500">
              No doctor profile found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
