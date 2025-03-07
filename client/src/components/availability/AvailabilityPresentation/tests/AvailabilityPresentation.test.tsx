import { render, screen, fireEvent } from "@testing-library/react";
import AvailabilityPresentation from "../index";
import AvailabilityComponent from "@/components/availability/AvailabilityComponent";

jest.mock("@/components/availability/timezone", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked TimezoneDropdown</div>),
}));

jest.mock("@/components/availability/AvailabilityComponent", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked AvailabilityComponent</div>),
}));

jest.mock("@/containers/doctor/exceptionAvailability", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked ExceptionAvailabilityContainer</div>),
}));

jest.mock("@/components/ui/button", () => ({
  __esModule: true,
  Button: jest.fn(({ onClick, disabled, children }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )),
}));

describe("AvailabilityPresentation", () => {
  const defaultProps = {
    reduxLoading: false,
    weekDays: ["Monday", "Tuesday"],
    timeSlots: ["09:00", "10:00"],
    availability: {},
    setAvailability: jest.fn(),
    toggleDropdown: jest.fn(),
    handleTimeChange: jest.fn(),
    errors: {},
    handleSave: jest.fn(),
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component without crashing", () => {
    render(<AvailabilityPresentation {...defaultProps} />);
    expect(screen.getByText("Availability")).toBeInTheDocument();
  });

  it("displays the loading state when reduxLoading is true", () => {
    render(<AvailabilityPresentation {...defaultProps} reduxLoading={true} />);
    expect(screen.queryByText("Availability")).not.toBeInTheDocument();
  });

  it("renders the correct heading and description", () => {
    render(<AvailabilityPresentation {...defaultProps} />);
    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(
      screen.getByText("Set your weekly availability for your patients")
    ).toBeInTheDocument();
  });

  it("renders the AvailabilityComponent with the correct props", () => {
    render(<AvailabilityPresentation {...defaultProps} />);
    expect(
      screen.getByText("Mocked AvailabilityComponent")
    ).toBeInTheDocument();
    expect(AvailabilityComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        weekDays: defaultProps.weekDays,
        timeSlots: defaultProps.timeSlots,
        availability: defaultProps.availability,
        toggleDropdown: defaultProps.toggleDropdown,
        handleTimeChange: defaultProps.handleTimeChange,
        errors: defaultProps.errors,
        setAvailability: defaultProps.setAvailability,
      }),
      expect.anything()
    );
  });

  it("renders the ExceptionAvailabilityContainer component", () => {
    render(<AvailabilityPresentation {...defaultProps} />);
    expect(
      screen.getByText("Mocked ExceptionAvailabilityContainer")
    ).toBeInTheDocument();
  });

  it("renders the Save button and handles its click event", () => {
    render(<AvailabilityPresentation {...defaultProps} />);
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(defaultProps.handleSave).toHaveBeenCalled();
  });

  it("disables the Save button when disabled is true", () => {
    render(<AvailabilityPresentation {...defaultProps} disabled={true} />);
    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeDisabled();
  });
});
