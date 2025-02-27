import { render, screen } from "@testing-library/react";
import PatientProfile from "./patientProfile";
import userEvent from "@testing-library/user-event";

jest.mock("lucide-react", () => ({
  User: () => <div data-testid="user-icon" />,
  Edit2: () => <div data-testid="edit-icon" />,
  Save: () => <div data-testid="save-icon" />,
  X: () => <div data-testid="cancel-icon" />,
}));

const mockProps = {
  loading: false,
  isEditing: false,
  updatedName: "Tanishq Khandelwal",
  updatedEmail: "tsk@example.com",
  updatedPhone: "1234567890",
  onNameChange: jest.fn(),
  onEmailChange: jest.fn(),
  onPhoneChange: jest.fn(),
  onEdit: jest.fn(),
  onSave: jest.fn(),
  onCancel: jest.fn(),
};

describe("PatientProfile Component", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<PatientProfile {...mockProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it("renders loading state when loading is true", () => {
    render(<PatientProfile {...mockProps} loading={true} />);
    expect(screen.getByText("Loading profile...")).toBeInTheDocument();
  });

  it("renders profile details in display mode", () => {
    render(<PatientProfile {...mockProps} />);
    expect(screen.getByText("Tanishq Khandelwal")).toBeInTheDocument();
    expect(screen.getByText("tsk@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /edit profile/i })
    ).toBeInTheDocument();
  });

  it("renders input fields in edit mode", () => {
    render(<PatientProfile {...mockProps} isEditing={true} />);
    expect(screen.getByDisplayValue("Tanishq Khandelwal")).toBeInTheDocument();
    expect(screen.getByDisplayValue("tsk@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls onEdit when the edit button is clicked", async () => {
    const user = userEvent.setup();
    render(<PatientProfile {...mockProps} />);
    await user.click(screen.getByRole("button", { name: /edit profile/i }));
    expect(mockProps.onEdit).toHaveBeenCalled();
  });

  it("calls onSave when the save button is clicked", async () => {
    const user = userEvent.setup();
    render(<PatientProfile {...mockProps} isEditing={true} />);
    await user.click(screen.getByRole("button", { name: /save/i }));
    expect(mockProps.onSave).toHaveBeenCalled();
  });

  it("calls onCancel when the cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<PatientProfile {...mockProps} isEditing={true} />);
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockProps.onCancel).toHaveBeenCalled();
  });
});
