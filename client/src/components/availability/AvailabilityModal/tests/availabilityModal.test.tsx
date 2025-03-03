import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AvailabilityModal from "../index";
import { useMutation } from "@apollo/client";
import { DateTime } from "luxon";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  gql: jest.fn(() => "mocked-gql-query"),
  useMutation: jest.fn(() => [jest.fn(), { loading: false, error: null }]),
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    loading: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

jest.mock("lucide-react", () => ({
  ChevronLeft: jest.fn(() => <div>ChevronLeft</div>),
  ChevronRight: jest.fn(() => <div>ChevronRight</div>),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("AvailabilityModal", () => {
  const mockSetShowModal = jest.fn();
  const mockSetSelectedDate = jest.fn();
  const today = new Date();
  const selectedDate = today;

  const defaultProps = {
    showModal: true,
    setShowModal: mockSetShowModal,
    selectedDate,
    setSelectedDate: mockSetSelectedDate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({ doctorId: "123" })
    );
  });

  it("renders the modal when showModal is true", () => {
    render(<AvailabilityModal {...defaultProps} />);
    expect(
      screen.getByText("Select the date and assign availability")
    ).toBeInTheDocument();
  });

  it("does not render the modal when showModal is false", () => {
    render(<AvailabilityModal {...defaultProps} showModal={false} />);
    expect(
      screen.queryByText("Select the date and assign availability")
    ).not.toBeInTheDocument();
  });

  it("updates the start and end time when input values change", () => {
    render(<AvailabilityModal {...defaultProps} />);

    const startTimeInput = screen.getByLabelText("Start Time:");
    const endTimeInput = screen.getByLabelText("End Time:");

    fireEvent.change(startTimeInput, { target: { value: "10:00" } });
    fireEvent.change(endTimeInput, { target: { value: "18:00" } });

    expect(startTimeInput).toHaveValue("10:00");
    expect(endTimeInput).toHaveValue("18:00");
  });

  it("toggles the availability checkbox", () => {
    render(<AvailabilityModal {...defaultProps} />);

    const checkbox = screen.getByLabelText("Available");
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("calls the updateAvailability mutation when the Confirm button is clicked", async () => {
    const mockUpdateAvailability = jest.fn().mockResolvedValue({});
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateAvailability,
      { loading: false, error: null },
    ]);

    render(<AvailabilityModal {...defaultProps} />);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockUpdateAvailability).toHaveBeenCalledWith({
        variables: {
          doctorId: "123",
          startTime: "09:00",
          endTime: "17:00",
          available: true,
          date: DateTime.fromJSDate(selectedDate).toISODate(),
        },
      });
    });
  });

  it("disables the Confirm button when role is 'guestdoctor'", () => {
    localStorageMock.getItem.mockReturnValue("guestdoctor");
    render(<AvailabilityModal {...defaultProps} />);

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toBeDisabled();
  });

  it("displays an error message if the mutation fails", async () => {
    const mockError = new Error("Mutation failed");
    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: mockError },
    ]);

    render(<AvailabilityModal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("Mutation failed")).toBeInTheDocument();
    });
  });
});
