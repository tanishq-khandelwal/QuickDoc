import { useEffect } from "react";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailability } from "@/containers/doctor/availability/actions";
import { RootState } from "@/redux/rootReducer";
import toast from "react-hot-toast";
import AvailabilityContainer from "@/containers/doctor/availability/index";

const AvailabilityPage = () => {
  const dispatch = useDispatch();
  const {
    data,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state: RootState) => state.doctoravailabilty);

  const userData = localStorage.getItem("user");
  const doctorId = userData ? JSON.parse(userData).doctorId : null;

  useEffect(() => {
    dispatch(fetchAvailability(doctorId));
  }, []);

  useEffect(() => {
    if (reduxLoading) {
      toast.loading("Loading...", { id: "loading" });
    } else {
      toast.dismiss("loading");
      if (reduxError) toast.error(`Loading failed: ${reduxError}`);
    }
  }, [reduxLoading, reduxError]);

  return (
    <Layout>
      <Navbar />
      <AvailabilityContainer
        data={data}
        reduxLoading={reduxLoading}
        doctorId={doctorId}
      />
    </Layout>
  );
};

export default AvailabilityPage;
