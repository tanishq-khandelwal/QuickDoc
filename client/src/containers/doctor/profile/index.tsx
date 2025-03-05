import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import ProfileComponent from "@/components/profile/profileComponenet";
import { GET_DOCTOR_PROFILE, UPDATE_PROFILE } from "@/queries/doctor/profile";
import { Doctor } from "@/components/profile/types";


const parseUserData = (): string | null => {
  const userData = localStorage.getItem("user");
  try {
    return userData ? JSON.parse(userData).doctorId : null;
  } catch (error) {
    console.error("Error parsing user data", error);
    return null;
  }
};

const ProfileContainer = () => {
  const doctorId = parseUserData();

  const { data, loading, error } = useQuery<{ doctors: Doctor[] }>(
    GET_DOCTOR_PROFILE,
    {
      variables: { doctorId },
      skip: !doctorId, // Prevent unnecessary query if no doctorId
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

  // More explicit type for formData
  const [formData, setFormData] = useState<Doctor | null>(null);
  const [isEdited, setIsEdited] = useState(false);

  // Type-safe mutation
  const [updateProfile] = useMutation<
    { updateDoctorProfile: Doctor },
    {
      id: string | null;
      city?: string;
      clinicAddress?: string;
      fee?: number;
      experience?: number;
      slot?: number;
      specialization?: string;
    }
  >(UPDATE_PROFILE);

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    }
  }, [doctor]);

  // Type-safe event handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      const { name, value } = e.target;


      const isNumericField =
        name === "experience_years" ||
        name === "slot_duration" ||
        name === "consultation_fee";

      setFormData((prev) => {
        if (!prev) return null;

        if (isNumericField) {
          const numericValue =
            value.trim() === "" ? 0 : Math.max(0, Number(value.trim()));

          return { ...prev, [name]: numericValue };
        }

        // Handling text fields
        return { ...prev, [name]: value.trim() };
      });

      setIsEdited(true);
    }
  };

  const handleSave = async () => {
    if (!formData || !doctorId) {
      toast.error("No profile data to save");
      return;
    }

    const requiredFields: (keyof Doctor)[] = [
      "city",
      "clinic_address",
      "consultation_fee",
      "experience_years",
      "slot_duration",
      "specialization",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = formData[field];
      return (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "number" && value < 0)
      );
    });

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    toast.loading("Updating Profile", { id: "loading" });

    try {
      await updateProfile({
        variables: {
          id: doctorId,
          city: formData.city?.trim(),
          clinicAddress: formData.clinic_address?.trim(),
          fee: formData.consultation_fee,
          experience: formData.experience_years,
          slot: formData.slot_duration,
          specialization: formData.specialization?.trim(),
        },
      });

      setIsEdited(false);
      toast.dismiss("loading");
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.dismiss("loading");
      toast.error(
        `An Error Occurred: ${err instanceof Error ? err.message : String(err)}`
      );
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
