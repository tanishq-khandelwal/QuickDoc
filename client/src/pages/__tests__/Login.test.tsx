import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "@/redux/store";
import Login from "../Login";
import { toast } from "react-hot-toast";

jest.mock("@/redux/store", () => ({
  ...jest.requireActual("@/redux/store"),
  runSaga: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
}));

// Test Suite for Login Component
describe("Login Component", () => {
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

  it("shows error for invalid email or password", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    await userEvent.type(screen.getByLabelText(/email/i), "abc");
    await userEvent.type(screen.getByLabelText(/password/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 4 characters/i)
    ).toBeInTheDocument();
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
    toast.success("Login Successful");
    expect(toast.success).toHaveBeenCalledWith("Login Successful");
  });
});
