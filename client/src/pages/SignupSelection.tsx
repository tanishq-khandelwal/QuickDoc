import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Stethoscope } from "lucide-react";

export default function SignupSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Left Side - Welcome Message */}
      <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0 p-6">
        <motion.h1 
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to QuickDoc
        </motion.h1>
        <p className="text-gray-600 mt-4 text-lg">
          Your one-stop platform for seamless healthcare access. Choose your role and get started today!
        </p>
      </div>
      
      {/* Right Side - Signup Options */}
      <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <Card 
            className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => navigate("/signup/patient")}
          >
            <CardContent className="flex flex-col items-center">
              <User size={48} className="text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800">Patient</h2>
              <p className="text-gray-600 text-sm mt-2">Book appointments, manage records, and receive health insights.</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <Card 
            className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => navigate("/signup/doctor")}
          >
            <CardContent className="flex flex-col items-center">
              <Stethoscope size={48} className="text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800">Doctor</h2>
              <p className="text-gray-600 text-sm mt-2">Manage patients, schedule appointments, and provide consultations.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
