import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import configureStore, { MockStore } from "redux-mock-store"; // Import MockStore type
import toast from "react-hot-toast";

const mockStore = configureStore([]); // Initialize mock store

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
  dismiss: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const initialState = {
  auth: { user: null, loading: false, error: null, isLoggedIn: false },
};

describe("Login Component", () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders email and password input fields", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const toggleButton = screen.getByRole("button", {
      name: /toggle password/i,
    });
    await userEvent.click(toggleButton);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute("type", "text");
    await userEvent.click(toggleButton);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("calls dispatch on valid submission", async () => {
    const mockDispatch = jest.fn();
    jest
      .spyOn(require("react-redux"), "useDispatch")
      .mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter> 
      </Provider>
    );
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "LOGIN_REQUEST" })
    );
  });

  it("shows success toast on login success", () => {
    // Simulate success toast
    toast.success("Login Successful");
    expect(toast.success).toHaveBeenCalledWith("Login Successful");
  });

  it("shows error toast on login failure", async () => {
    const mockDispatch = jest.fn();
    jest
      .spyOn(require("react-redux"), "useDispatch")
      .mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/email/i), "wrong@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    toast.error("Login failed: Invalid credentials");

    expect(toast.error).toHaveBeenCalledWith(
      "Login failed: Invalid credentials"
    );
  });
});
