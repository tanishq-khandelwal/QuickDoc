// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";


// Define types for payloads
type LoginCredentials = {
  email: string;
  password: string;
};

type LoginUser = {
  user_id: number;
  role: string;
  name: string;
  doctorId: number;
};

type LoginError = {
  message: string;
};


type SignupCredentials={
      name:string,
      email:string,
      password: string,
      phone_number:string,
      role:string,
}
// Action Creators with TypeScript Types
export const loginRequest = (payload: LoginCredentials) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (user: LoginUser) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: LoginError) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutSuccess = () => ({ type: "LOGOUT_SUCCESS" });

export const logoutFailure = (error: string) => ({
  type: "LOGOUT_FAILURE",
  error,
});


export const signupRequest = (credentials: SignupCredentials) => ({
  type: SIGNUP_REQUEST,
  payload: credentials,
});

export const signupSuccess = (user: any) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error: string) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});