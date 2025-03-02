import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "@/redux/rootReducer";
import { getUserAvailability } from "@/helper/patient/availability";
import DoctorProfile from "@/components/doctorProfile/doctorProfile";
import AppointmentBooking from "@/components/appointmentBooking";
import { fetchDoctorAvailabilty } from "./actions";

const DoctorPreviewContainer = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const doctorId = Number(searchParams.get("doctorId"));

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchDoctorAvailabilty(doctorId));
    }
  }, [doctorId]);

  const { doctorAvailability, loading, error } = useSelector(
    (state: RootState) => state.availability
  );

  const data = doctorAvailability?.[0];

  const [availableDays, setAvailableDays] = useState<any[]>([]);
  const [exceptionAvailabilities, setExceptionAvailabilities] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      getUserAvailability(data).then(({ availability, exceptionAvailabilities }) => {
        setAvailableDays(availability);
        setExceptionAvailabilities(exceptionAvailabilities);
      });
    }
  }, [data]);

  return (
    <div className="min-h-screen pt-24 px-6 py-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center mt-8">Error: {error}</div>
      ) : (
        <>
          <DoctorProfile data={data} />
          <AppointmentBooking data={data} availableDays={availableDays} exceptionAvailabilities={exceptionAvailabilities}  />
        </>
      )}
    </div>
  );
};

export default DoctorPreviewContainer;
