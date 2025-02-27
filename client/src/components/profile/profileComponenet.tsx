import React from "react";
import { ProfileComponentProps } from "./types";

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  formData,
  isEdited,
  handleChange,
  handleSave,
}) => {
  if (!formData) {
    return <p className="text-center text-gray-500">No doctor profile found.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white mt-16">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Doctor Profile
        </h1>

        <form className="md:grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.user.name}
              readOnly
              className="w-full px-4 py-2 border rounded-lg hover:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
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
            <label className="block text-gray-700 font-medium mb-2">City</label>
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
      </div>
    </div>
  );
};

export default ProfileComponent;