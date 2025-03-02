import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "@/redux/actions/authActions";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/rootReducer";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import hidepass from "../../assets/hidpass.svg";
import showpass from "../../assets/showpass.svg";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  phone_number: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  role: z.string().default("patient"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPatient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: SignupFormValues) => {
    dispatch(signupRequest(data));
    setIsSubmitted(true);  // Mark the form as submitted
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...", { id: "loading" });
    } else {
      toast.dismiss("loading");
    }

    if (error) {
      toast.error(`Signup failed: ${error}`);
    }

    // Only show success after submission is complete and no error exists
    if (!loading && !error && isSubmitted) {
      toast.success("Signup Successful");
      navigate("/login"); // Navigate to login page after success
      setIsSubmitted(false);  // Reset the submission state
    }
  }, [loading, error, isSubmitted, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="flex gap-2 text-sm font-medium text-gray-700">
              Name <div className="text-red-500">*</div>
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="flex gap-2 text-sm font-medium text-gray-700">
              Email  <div className="text-red-500">*</div>
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg "
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="flex gap-2 text-sm font-medium text-gray-700">
              Phone Number  <div className="text-red-500">*</div>
            </label>
            <input
              type="text"
              {...register("phone_number")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg "
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">{errors.phone_number.message}</p>
            )}
          </div>

          {/* Password Field */}
           <div className="relative">
            <label className="flex gap-2 text-sm font-medium text-gray-700">
              Password  <div className="text-red-500">*</div>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg  pr-10"
            />
            <button
              type="button"
              className="absolute top-9 right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? showpass : hidepass}
                alt="Toggle Password"
                className="w-5 h-5"
              />
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="text-sm text-gray-500">
              Already have an account ?
            </div>
            
            <Link to='/login?role=patient'>
            <p className="text-sm text-blue-500 underline">
              Login
            </p>
            </Link>
            
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-auto px-8 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
