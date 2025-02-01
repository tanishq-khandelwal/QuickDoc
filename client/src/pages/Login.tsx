import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginRequest } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "../redux/rootReducer";
import toast from "react-hot-toast";
import hidepass from "../assets/hidpass.svg";
import showpass from "../assets/showpass.svg";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address").min(4,"Email should be atleast 4 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      toast.dismiss("loading");
      toast.success("Login Successful");
      navigate("/");
    } else if (loading) {
      toast.loading("Loading...", { id: "loading" });
    } else if (error) {
      toast.dismiss("loading");
      toast.error(`Login failed: ${error}`);
    }
  }, [user, navigate, loading, error]);

  // Submit handler
  const onSubmit = (data: LoginFormValues) => {
    const { email, password } = data;
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md border-2 bg-white shadow-lg rounded-lg p-6 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
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

          {/* Password Field with Show/Hide Toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
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

          {/* Signup Link */}
          <div className="flex gap-4">
            <div className="text-gray-600 text-sm">Don't have an account?</div>
            <a href="/signup" className="text-sm underline text-blue-500">
              Sign Up
            </a>
          </div>

          {/* Login Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-auto px-8 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
