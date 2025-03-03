import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "../confirmationModal";
import CheckoutButton from "@/stripe/checkoutForm";

jest.mock("@/stripe/checkoutForm", () => ({
  __esModule: true,
  default: jest.fn(({ onSuccess }) => (
    <button onClick={onSuccess}>CheckoutButton</button>
  )),
}));

describe("ConfirmationModal", () => {
  const mockSetShowConfirmModal = jest.fn();
  const mockHandleBookingAppointment = jest.fn();
  const selectedDate = new Date("2023-10-15");
  const selectedTime = "14:30";
  const consultationFee = 100;

  const defaultProps = {
    showConfirmModal: true,
    setShowConfirmModal: mockSetShowConfirmModal,
    selectedDate,
    selectedTime,
    consultationFee,
    handleBookingAppointment: mockHandleBookingAppointment,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal when showConfirmModal is true", () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByText("Confirm Appointment")).toBeInTheDocument();
  });

  it("does not render the modal when showConfirmModal is false", () => {
    render(<ConfirmationModal {...defaultProps} showConfirmModal={false} />);
    expect(screen.queryByText("Confirm Appointment")).not.toBeInTheDocument();
  });

  it("calls setShowConfirmModal(false) when the Cancel button is clicked", () => {
    render(<ConfirmationModal {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockSetShowConfirmModal).toHaveBeenCalledWith(false);
  });

  it("renders the CheckoutButton with the correct props", () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(CheckoutButton).toHaveBeenCalledWith(
      {
        onSuccess: mockHandleBookingAppointment,
        price: consultationFee,
      },
      expect.anything()
    );
  });
});
