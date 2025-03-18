import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CookieOptions, Request, Response } from "express";
import { apolloClient } from "../config/hasuraClient.ts";
import { CHECK_USER, CREATE_USER } from "../queries/UserQueries.ts";

const cookieOptions: CookieOptions = {
  secure: true,
  domain: 'quick-doc-drab.vercel.app',
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: false,
  path: "/",
};

type SignupData = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password, phone_number, role }: SignupData = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

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
      fetchPolicy: "network-only",
    });

    console.log(result.data);
    if (result.data.users.length > 0) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const response = await apolloClient.mutate({
      mutation: CREATE_USER,
      variables: { user },
    });

    return res.status(201).json({
      message: "User Registered Successfully",
      response: response.data.insert_users.returning,
    });
  } catch (err) {
    console.error("An error occurred during registration:", err);
    return res
      .status(500)
      .json({ message: "An error occurred during registration" });
  }
};

export const LoginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password }: LoginData = req.body;

  try {
    const result = await apolloClient.query({
      query: CHECK_USER,
      variables: { email },
      fetchPolicy: "network-only",
    });

    console.log(result.data.users);

    if (result.data.users.length === 0) {
      return res.status(400).json({
        message: "Account Not Found",
      });
    }

    const user = result.data.users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT Secret not configured." });
    }
    const tokenPayload = {
      email: user.email,
      role: user.role,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": [
          "guestpatient",
          "guestdoctor",
          "patient",
          "doctor",
        ],
        "x-hasura-default-role": user.role,
        "x-hasura-role": user.role,
        "x-hasura-user-id": user.user_id.toString(),
      },
    };

    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "1d" });

    res.cookie("token", token, cookieOptions);
    console.log("Token",token);

    const returnData = {
      user_id: result.data.users[0].user_id,
      role: result.data.users[0].role,
      name: result.data.users[0].name,
      doctorId: result.data?.users[0]?.doctors[0]?.doctor_id || null,
    };

    return res.status(200).json({
      message: "User Logged In Successfully",
      data: returnData,
      token: token,
    });
  } catch (err) {
    console.error("An error occurred during login:", err);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

export const LogoutUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User Logged Out Successfully" });
};
