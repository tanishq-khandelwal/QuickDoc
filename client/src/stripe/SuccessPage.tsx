import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { bookAppointment } from "@/redux/actions/patient/bookAppointmentAction";
import { CheckCircleIcon } from "lucide-react";
import Layout from "@/Layout";
import { Navbar } from "@/Navbar";

export default function SuccessPage() {
  const dispatch = useDispatch();
  const appointmentData = JSON.parse(
    sessionStorage.getItem("appointmentData") || "{}"
  );
  const hasDispatched = useRef(false); // Ref to track dispatch status

  useEffect(() => {
    if (appointmentData && !hasDispatched.current) {
      dispatch(bookAppointment(appointmentData));
      hasDispatched.current = true; // Mark dispatch as done
      sessionStorage.removeItem("appointmentData");
    }
  }, [appointmentData, dispatch]);

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center p-6">
        <CheckCircleIcon size={64} className="text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your appointment has been successfully booked.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
        >
          Go to Home
        </a>
      </div>
    </Layout>
  );
}
