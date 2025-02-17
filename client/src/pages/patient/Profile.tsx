import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MyProfile, UpdateProfile } from "@/queries/patient/profile";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { User, Edit2, Save, X } from "lucide-react";


const PatientProfile = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(MyProfile, { variables: { id } });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updateProfile] = useMutation(UpdateProfile);
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).user_id : null;

  console.log(updatedName, updatedEmail, updatedPhone);
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

  useEffect(() => {
    if (data?.users?.length) {
      setUpdatedName(data.users[0].name || "N/A");
      setUpdatedEmail(data.users[0].email || "N/A");
      setUpdatedPhone(data.users[0].phone_number || "N/A");
    }
  }, [data]);

  const handleSave = async () => {
    try {
      const { data } = await updateProfile({
        variables: {
          id: userId,
          email: updatedEmail,
          name: updatedName,
          phone: updatedPhone,
        },
      });
      console.log(data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error.message}`);
    }
  };

  if (error) {
    return (
      <p className="text-center mt-8 text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <Layout>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      ) : (
        <div className="mt-24 flex justify-center items-center">
          <div className="bg-white shadow-lg border border-gray-300 rounded-xl p-6 w-full sm:w-[380px]">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="border-2 border-[#14BFF1] rounded-full p-3 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-gray-100">
                <User className="w-20 h-20 sm:w-24 sm:h-24 text-gray-500" />
              </div>
            </div>
  
            {/* Profile Details */}
            <div className="text-gray-700 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                ) : (
                  <p className="text-lg font-medium">{updatedName}</p>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                  />
                ) : (
                  <p className="text-lg font-medium">{updatedEmail}</p>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                    value={updatedPhone}
                    onChange={(e) => setUpdatedPhone(e.target.value)}
                  />
                ) : (
                  <p className="text-lg font-medium">{updatedPhone}</p>
                )}
              </div>
            </div>
  
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#14BFF1] text-white rounded-lg shadow-md hover:bg-gray-600"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );  
};

export default PatientProfile;
