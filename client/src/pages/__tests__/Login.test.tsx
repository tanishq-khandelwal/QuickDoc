import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { loginRequest } from "@/redux/actions/authActions";
import toast from "react-hot-toast";
import Login from "../Login";

// Mock toast notifications
jest.mock("react-hot-toast", () => ({
  dismiss: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
}));

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: { user: null, loading: false, error: null },
    });
    store.dispatch = jest.fn();
  });

  test("renders login form with email and password fields", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("displays validation errors for empty fields", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/Enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 4 characters/i)).toBeInTheDocument();
  });

  test("dispatches login request on valid form submission", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        loginRequest({ email: "test@example.com", password: "password123" })
      );
    });
  });

  test("shows loading toast when login is in progress", async () => {
    store = mockStore({ auth: { user: null, loading: true, error: null } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Loading...", { id: "loading" });
    });
  });

  test("shows error toast when login fails", async () => {
    store = mockStore({ auth: { user: null, loading: false, error: "Invalid credentials" } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login failed: Invalid credentials");
    });
  });

  test("redirects user on successful login", async () => {
    store = mockStore({ auth: { user: { id: 1, name: "John Doe" }, loading: false, error: null } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(toast.success).toHaveBeenCalledWith("Login Successful");
    });
  });

  test("toggles password visibility", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    const toggleButton = screen.getByRole("button", { name: /Toggle Password/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
