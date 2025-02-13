import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { GET_DOCTOR_PROFILE, UPDATE_PROFILE } from "@/queries/doctor/profile";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Doctor {
  user: {
    name: string;
    email: string;
    phone_number: string;
  };
  experience_years: number;
  specialization: string;
  slot_duration: number;
  consultation_fee: number;
  city: string;
  clinic_address: string;
}

const Profile = () => {
  const userData = localStorage.getItem("user");
  const doctorId = userData ? JSON.parse(userData).doctorId : null;

  const { data, loading, error } = useQuery<{ doctors: Doctor[] }>(
    GET_DOCTOR_PROFILE,
    {
      variables: { doctorId },
    }
  );

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

  const [formData, setFormData] = useState<Doctor | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    }
  }, [doctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
      setIsEdited(true);
    }
  };

  const handleSave = async () => {
    toast.loading("Updating Profile", { id: "loading" });

    console.log("Updated Profile Data:", formData);

    const variables = {
      id: doctorId,
      city: formData?.city,
      clinicAddress: formData?.clinic_address,
      fee: formData?.consultation_fee,
      experience: formData?.experience_years,
      slot: formData?.slot_duration,
      specialization: formData?.specialization,
    };

    try {
      await updateProfile({ variables });
      setIsEdited(false);
      toast.dismiss("loading");
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.dismiss("loading");
      toast.error(`An Error Occurred: ${err}`);
      console.error("An Error Occurred", err);
    }
  };

  return (
    <Layout>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white mt-16">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
            <h1 className="text-2xl font-bold text-center mb-6">
              Doctor Profile
            </h1>

            {formData ? (
              <form className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.user.name}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg hover:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.user.email}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg hover:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.user.phone_number}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg hover:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Experience Years
                  </label>
                  <input
                    type="number"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Slot Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="slot_duration"
                    value={formData.slot_duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Consultation Fee
                  </label>
                  <input
                    type="text"
                    name="consultation_fee"
                    value={formData.consultation_fee}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Clinic Address
                  </label>
                  <textarea
                    name="clinic_address"
                    value={formData.clinic_address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  ></textarea>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!isEdited}
                    className={`px-6 py-2 font-medium rounded-lg focus:outline-none focus:ring focus:ring-blue-200 ${
                      isEdited
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-center text-gray-500">No doctor profile found.</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
