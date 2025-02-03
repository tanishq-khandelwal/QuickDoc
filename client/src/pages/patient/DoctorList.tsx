import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { User } from "lucide-react";
import { useState } from "react";

const DoctorList = () => {
  const data = {
    data: {
      doctors: [
        {
          doctor_id: 1,
          clinic_address: "Pune",
          consultation_fee: 500,
          city: "Pune",
          experience_years: 2,
          specialization: "MBBS",
          created_at: "2025-01-31T07:44:26.20989",
          user: {
            name: "Tanishq Khandelwal",
            email: "tsk@gmail.com",
            phone_number: "9011616611",
          },
        },
        {
          doctor_id: 2,
          clinic_address: "Mumbai",
          consultation_fee: 700,
          city: "Mumbai",
          experience_years: 5,
          specialization: "Dentist",
          created_at: "2025-01-31T07:44:26.20989",
          user: {
            name: "John Doe",
            email: "john@example.com",
            phone_number: "9876543210",
          },
        },
        // More doctors can be added here...
      ],
    },
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = data.data.doctors.filter((doctor) =>
    doctor.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="px-4 py-2 border rounded-md w-full max-w-[50rem] focus:outline-none focus:ring-2 focus:ring-indigo-900 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Doctor Cards */}
        <div className="flex flex-wrap px-6 gap-4">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-3 text-center text-xl text-gray-500">
              No doctors found.
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.doctor_id}
                className="bg-white border-2 shadow-md rounded-lg p-6 flex  w-full cursor-pointer hover:shadow-xl "
              >
                <div className="h-full px-10 flex items-center bg-gray-400 border-gray-300 border-1 rounded-full ">
                  <User size={62} />
                </div>
                <div className="items-center justify-center flex-1 ml-4">
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
                  {/* <p className="text-gray-600 mt-1">Consultation Fee: ₹{doctor.consultation_fee}</p> */}
                  <p className="text-gray-600 mt-1">
                    Clinic Address: {doctor.clinic_address}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                    <button className="px-4 py-2 bg-[#199ED8] text-white rounded-md">
                        Book Appointment
                    </button>
                    <button className="px-8 py-2 bg-white text-blue-800 border-gray-400 border-2 rounded-md">
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
