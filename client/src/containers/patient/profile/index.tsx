import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MyProfile, UpdateProfile } from "@/queries/patient/profile";
import PatientProfile from "@/components/patientProfile/patientProfile";

const PatientProfileContainer = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(MyProfile, { variables: { id } });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updateProfile] = useMutation(UpdateProfile);
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).user_id : null;

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
    <PatientProfile
      loading={loading}
      isEditing={isEditing}
      updatedName={updatedName}
      updatedEmail={updatedEmail}
      updatedPhone={updatedPhone}
      onNameChange={setUpdatedName}
      onEmailChange={setUpdatedEmail}
      onPhoneChange={setUpdatedPhone}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    />
  );
};

export default PatientProfileContainer;
