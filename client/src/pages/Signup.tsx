import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  phone_number: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone_number")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
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

          <div>Already </div>
        </form>
      </div>
    </div>
  );
}
