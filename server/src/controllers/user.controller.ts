import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { apolloClient } from "../config/hasuraClient.ts";  // Assuming you don't need the `.ts` extension here
import { CHECK_USER, CREATE_USER } from "../queries/UserQueries.ts";

const cookieOptions: {
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  maxAge: number;
  httpOnly: boolean;
} = {
  secure: true,
  sameSite: "none", 
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

type SignupData = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
};

export const RegisterUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, phone_number, role }: SignupData = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT Secret not configured." });
    }

    const user = {
      name,
      email,
      password: hashedPassword,
      phone_number,
      role,
    };

    const result = await apolloClient.query({
      query: CHECK_USER,
      variables: { email },
    });

    if (result.data.users.length > 0) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const response = await apolloClient.mutate({
      mutation: CREATE_USER,
      variables: { user },
    });

    const token = jwt.sign({ email, role }, jwtSecret, { expiresIn: "7d" });

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "User Registered Successfully",
      response: response.data.insert_users.returning,
    });
  } catch (err) {
    console.error("An error occurred during registration:", err);
    return res.status(500).json({ message: "An error occurred during registration" });
  }
};
