import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function FailurePage() {

  const dispatch = useDispatch();
  const appointmentData = JSON.parse(
    sessionStorage.getItem("appointmentData") || "{}"
  );

  useEffect(() => {
    if (appointmentData) {
      sessionStorage.removeItem("appointmentData");
    }
  }, [appointmentData, dispatch]);

  return (
    <Layout>
        <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <svg className="w-16 h-16 mx-auto mb-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
        <p className="text-lg mb-6">Your payment was not successful. A refund has been initiated, and you will receive it within 5-7 working days.</p>
        <p className="mb-4">If you need assistance, please contact our <Link to="/support" className="text-blue-600 hover:underline">Customer Support</Link>.</p>
        <Link to="/" className="inline-block px-6 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition">Return Home</Link>
      </div>
    </div>
    </Layout>
  );
}
