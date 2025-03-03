import { render, screen, fireEvent } from "@testing-library/react";
import TimeSlotPicker from "../timeSlotPicker";

jest.mock("@/components/ui/button", () => ({
  Button: jest.fn(({ children, onClick, disabled, className }) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  )),
}));

describe("TimeSlotPicker", () => {
  const mockSetSelectedTime = jest.fn();
  const availableTimeSlots = ["09:00", "10:00", "11:00"];
  const selectedTime = "10:00";
  const role = "patient";

  const defaultProps = {
    availableTimeSlots,
    selectedTime,
    setSelectedTime: mockSetSelectedTime,
    role,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with available time slots", () => {
    render(<TimeSlotPicker {...defaultProps} />);

    expect(screen.getByText("Available Time Slots")).toBeInTheDocument();

    expect(screen.getByText("9:00 AM")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("11:00 AM")).toBeInTheDocument();
  });

  it("renders a message when no time slots are available", () => {
    render(<TimeSlotPicker {...defaultProps} availableTimeSlots={[]} />);

    expect(
      screen.getByText(
        "No time slots available for this day as Doctor is not Available at the given time"
      )
    ).toBeInTheDocument();
  });

  it("selects a time slot when a button is clicked", () => {
    render(<TimeSlotPicker {...defaultProps} />);

    const button = screen.getByText("10:00 AM");
    fireEvent.click(button);

    expect(mockSetSelectedTime).toHaveBeenCalledWith("10:00");
  });

  it("disables time slot buttons when role is 'guestpatient'", () => {
    render(<TimeSlotPicker {...defaultProps} role="guestpatient" />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("applies the correct styles to the selected time slot", () => {
    render(<TimeSlotPicker {...defaultProps} />);

    const selectedButton = screen.getByText("10:00 AM");
    expect(selectedButton).toHaveClass("bg-[#0067E7] text-white shadow-xl");

    const nonSelectedButton = screen.getByText("9:00 AM");
    expect(nonSelectedButton).toHaveClass(
      "bg-[#F2F8FF] text-[#0067E7] border-[#0169FE]"
    );
  });
});
