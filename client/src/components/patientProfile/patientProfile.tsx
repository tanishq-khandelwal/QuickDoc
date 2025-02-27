import { User, Edit2, Save, X } from "lucide-react";
import React from "react";
import { PatientProfileProps } from "./types";

const PatientProfile: React.FC<PatientProfileProps> = ({
  loading,
  isEditing,
  updatedName,
  updatedEmail,
  updatedPhone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <>
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
                    onChange={(e) => onNameChange(e.target.value)}
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
                    onChange={(e) => onEmailChange(e.target.value)}
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
                    onChange={(e) => onPhoneChange(e.target.value)}
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
                    onClick={onSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={onCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-[#14BFF1] text-white rounded-lg shadow-md hover:bg-gray-600"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientProfile;
