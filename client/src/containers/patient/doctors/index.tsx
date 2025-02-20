import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "@/redux/actions/patient/doctorListAction";
import { RootState } from "@/redux/rootReducer";
import toast from "react-hot-toast";
import DoctorCard from "@/components/doctorList/doctorCard";
import SearchBar from "@/components/doctorList/searchBar";

const DoctorListContainer: React.FC = () => {
  const { doctors, loading, error } = useSelector((state: RootState) => state.doctor);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredDoctors =
    doctors?.filter((doctor) =>
      doctor?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left">
        Doctor List
      </h1>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Doctor Cards */}
      <div className="sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => <DoctorCard key={doctor.doctor_id} doctor={doctor} />)
        ) : (
          <div className="col-span-full text-center text-xl text-gray-500"> </div>
        )}
      </div>
    </div>
  );
};

export default DoctorListContainer;
