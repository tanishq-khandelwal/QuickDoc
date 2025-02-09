import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Mail, MapPin, Phone, User } from "lucide-react";
import hidepass from "../../assets/hidpass.svg";
import showpass from "../../assets/showpass.svg";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "@/redux/actions/authActions";
import { SIGNUP_DOCTOR } from "@/queries/doctor/signup";
import { RootState } from "@/redux/rootReducer";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// QuickDoc Colors
const primaryColor = "text-blue-600";

// Step 1: Schema for Personal Information
interface ProfessionalData {
  specialization: string;
  experience_years: string;
  clinic_address?: string;
  city: string;
  consultation_fee: string;
}

const personalInfoSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone_number: z
    .string()
    .regex(/^\d{9,15}$/, "Phone number must be 10-15 digits"),
  role:z.string().default("doctor")
});

// Step 2: Schema for Professional Details
const professionalInfoSchema = z.object({
  specialization: z.string().min(3, "Specialization is required"),
  experience_years: z.string().min(1, "Experience must be at least 1 year"),
  clinic_address: z.string().optional(),
  city: z.string().min(2, "City is required"),
  consultation_fee: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid fee format"),
  
});

export default function Signup() {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState({});
  const [professionalData, setProfessionalData] = useState<ProfessionalData |{}>({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  // Step 1: Personal Info Form
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
  });

  // Step 2: Professional Info Form
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
  } = useForm({
    resolver: zodResolver(professionalInfoSchema),
  });

  // Handle Step 1 Submission
  const onSubmitStep1 = (data: any) => {
    setPersonalData(data);
    dispatch(signupRequest(data)); 
    setStep(2);
  };

  // Handle Step 2 Submission
  const [signupDoctor] = useMutation(SIGNUP_DOCTOR);
  const { user} = useSelector((state: RootState) => state.auth);


  const onSubmitStep2 = async (data: any) => {
    // Update professionalData with form data
    setProfessionalData(data);

    // Extract userId from the response (assuming it's correctly populated in Redux state)
    const userId = user?.response[0]?.user_id;
    console.log("User ID:", userId);

    // Ensure userId is present
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }

    console.log("professionalData is:",professionalData);
    const {specialization, experience_years, clinic_address, city, consultation_fee } = data;
    console.log("Form Data:", specialization, experience_years, clinic_address, city, consultation_fee);

    const loadingToast = toast.loading("Signing up...");

    try {
      const response = await signupDoctor({
        variables: {
          userId,
          specialization,
          experience_years,
          clinic_address,
          city,
          consultation_fee,
        },
      });

      console.log(response?.data?.insert_doctors?.returning);

      if(response?.data?.insert_doctors?.returning){
        toast.success("Sign Up Successful", { id: loadingToast })
        navigate('/login')
      }

      if(response?.errors){
        toast.error("Error while Signing Up", { id: loadingToast });
      }
      console.log("Final Form Data:", { ...personalData, ...data });
    } catch (error) {
      console.log("Reached here");
      console.error("Mutation Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Landing Section */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold">
            Get Onboarded with <span className={primaryColor}>QuickDoc</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Join the best digital healthcare platform today!
          </p>
        </motion.div>
      )}

      {/* Form Card */}
      <Card className="max-w-lg w-full shadow-lg bg-white">
        <CardContent className="p-6">
          {step === 1 && (
            <motion.form
              onSubmit={handleSubmitStep1(onSubmitStep1)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-xl flex justify-center font-semibold">
                Sign Up
              </h2>

              <div className="relative">
                <User className="absolute left-2 top-2 text-gray-500" />
                <Input
                  {...registerStep1("name")}
                  placeholder="Full Name"
                  className="pl-10"
                />
              </div>
              {errorsStep1.name && (
                <p className="text-red-500">
                  {errorsStep1.name.message?.toString() || ""}
                </p>
              )}

              <div className="relative">
                <Mail className="absolute left-2 top-2 text-gray-500" />
                <Input
                  {...registerStep1("email")}
                  placeholder="Email"
                  className="pl-10"
                />
              </div>
              {errorsStep1.email && (
                <p className="text-red-500">
                  {errorsStep1.email.message?.toString() || ""}
                </p>
              )}

              <div className="relative">
                <Phone className="absolute left-2 top-2 text-gray-500" />
                <Input
                  {...registerStep1("phone_number")}
                  placeholder="Phone Number"
                  className="pl-10"
                />
              </div>
              {errorsStep1.phone_number && (
                <p className="text-red-500">
                  {errorsStep1.phone_number.message?.toString() || ""}
                </p>
              )}

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...registerStep1("password")}
                  placeholder="Password"
                  className="pr-10" // Add padding to avoid overlap with button
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? showpass : hidepass}
                    alt="Toggle Password"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {errorsStep1.password && (
                <p className="text-red-500">
                  {errorsStep1.password.message?.toString() || ""}
                </p>
              )}

              <div className="flex gap-4">
                <div className="text-sm text-gray-500">
                  Already have an account ?
                </div>
                <a href="/login" className="text-sm text-blue-500 underline">
                  Login
                </a>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
              </Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              onSubmit={handleSubmitStep2(onSubmitStep2)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold">Professional Details</h2>

              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-gray-500" />
                <Input
                  {...registerStep2("specialization")}
                  placeholder="Specialization"
                  className="pl-10"
                />
              </div>
              {errorsStep2.specialization && (
                <p className="text-red-500">
                  {errorsStep2.specialization.message?.toString() || ""}
                </p>
              )}

              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-500" />
                <Input
                  {...registerStep2("city")}
                  placeholder="City"
                  className="pl-10"
                />
              </div>
              {errorsStep2.city && (
                <p className="text-red-500">
                  {errorsStep2.city.message?.toString() || ""}
                </p>
              )}

              <div className="relative">
                <Input
                  {...registerStep2("clinic_address")}
                  placeholder="Clinic Address"
                />
              </div>
              {errorsStep2.clinic_address && (
                <p className="text-red-500">
                  {errorsStep2.clinic_address.message?.toString() || ""}
                </p>
              )}

              <div className="relative">
                <Input
                  type="number"
                  {...registerStep2("experience_years")}
                  placeholder="Experience Years"
                />
              </div>
              {errorsStep2.experience_years && (
                <p className="text-red-500">
                  {errorsStep2.experience_years.message?.toString() || ""}
                </p>
              )}

              <div className="relative">
                <Input
                  type="number"
                  {...registerStep2("consultation_fee")}
                  placeholder="Consultation Fee"
                />
              </div>
              {errorsStep2.consultation_fee && (
                <p className="text-red-500">
                  {errorsStep2.consultation_fee.message?.toString() || ""}
                </p>
              )}

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-500 text-white"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit
                </Button>
              </div>
            </motion.form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
