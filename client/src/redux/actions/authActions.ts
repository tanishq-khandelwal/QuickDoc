// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Define types for payloads
type LoginCredentials ={
  email: string;
  password: string;
}

type LoginUser= {
  user_id: number;
  role: string;
  name:string,
  doctorId:number
}

type LoginError ={
  message: string;
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
