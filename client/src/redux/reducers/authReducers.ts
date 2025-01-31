// Define action types
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

// Define the state type
interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  isLoggedIn:boolean;
}

// Define the action types
interface AuthAction {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn:false,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("Login request called")
      return { ...state, loading: true, error: null,isLoggedIn:true };

    case LOGIN_SUCCESS:
      console.log("Login success called")
      return { ...state, loading: false, user: action.payload, error: null };
      

    case LOGIN_FAILURE:
      console.log("Login failure called")
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return { ...state, user: null, loading: false, error: null };

    default:
      return state;
  }
};

export default authReducer;
