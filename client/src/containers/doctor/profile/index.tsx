import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import ProfileComponent from "@/components/profile/profileComponenet";
import { GET_DOCTOR_PROFILE, UPDATE_PROFILE } from "@/queries/doctor/profile";
import { Doctor } from "@/components/profile/types";


const ProfileContainer = () => {
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
      const trimmedValue = value.trim();

  if (trimmedValue === "") return;

      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
      setIsEdited(true);
    }
  };

  const handleSave = async () => {
    toast.loading("Updating Profile", { id: "loading" });

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
    <ProfileComponent
      formData={formData}
      loading={loading}
      isEdited={isEdited}
      handleChange={handleChange}
      handleSave={handleSave}
    />
  );
};

export default ProfileContainer;
