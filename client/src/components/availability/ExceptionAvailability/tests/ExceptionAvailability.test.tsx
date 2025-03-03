import { render, screen, fireEvent } from "@testing-library/react";
import ExceptionAvailability from "../index";
import { DateTime } from "luxon";

const mockExceptionDates = [
  {
    special_date: "2023-10-01",
    start_time: "09:00:00",
    end_time: "17:00:00",
    is_available: true,
    availability_id: 1,
  },
  {
    special_date: "2023-10-02",
    start_time: "10:00:00",
    end_time: "18:00:00",
    is_available: false,
    availability_id: 2,
  },
];

const mockProps = {
  exceptionDates: mockExceptionDates,
  showModal: false,
  setShowModal: jest.fn(),
  selectedDate: undefined,
  setSelectedDate: jest.fn(),
  handleDelete: jest.fn(),
  disabled: false,
  setDisable: jest.fn(),
};

jest.mock("lucide-react", () => ({
  Trash2: jest.fn(() => <div>Trash2</div>),
}));

describe("ExceptionAvailability", () => {
  it("renders the component correctly", () => {
    render(<ExceptionAvailability {...mockProps} />);

    expect(screen.getByText("Date-Specific Hours")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Override your availability / unavailability for specific dates when your hours differ from your regular weekly hours."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("+ Add date-specific hours")).toBeInTheDocument();
  });

  it("renders the list of exception dates correctly", () => {
    render(<ExceptionAvailability {...mockProps} />);

    mockExceptionDates.forEach((item) => {
      expect(
        screen.getByText(
          DateTime.fromISO(item.special_date).toFormat("dd-MM-yy")
        )
      ).toBeInTheDocument();
      if (item.is_available) {
        expect(screen.getByText("09:00 AM")).toBeInTheDocument();
        expect(screen.getByText("05:00 PM")).toBeInTheDocument();
      } else {
        const dashElements = screen.getAllByText("- -");
        expect(dashElements.length).toBe(2);
      }
      expect(
        screen.getByText(item.is_available ? "Available" : "Not Available")
      ).toBeInTheDocument();
      expect(screen.getAllByTestId("delete-button").length).toBe(
        mockExceptionDates.length
      );
    });
  });

  it("formats the time correctly", () => {
    render(<ExceptionAvailability {...mockProps} />);

    const formattedTime = DateTime.fromISO("09:00:00").toFormat("hh:mm a");
    expect(formattedTime).toBe("09:00 AM");
  });

  it("opens the AvailabilityModal when the 'Add date-specific hours' button is clicked", () => {
    render(<ExceptionAvailability {...mockProps} />);

    fireEvent.click(screen.getByText("+ Add date-specific hours"));
    expect(mockProps.setShowModal).toHaveBeenCalledWith(true);
  });

  it("calls handleDelete and setDisable when the delete button is clicked", () => {
    render(<ExceptionAvailability {...mockProps} />);

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(mockProps.handleDelete).toHaveBeenCalledWith(
      mockExceptionDates[0].availability_id
    );
    expect(mockProps.setDisable).toHaveBeenCalledWith(true);
  });

  it("disables the delete button when the disabled prop is true", () => {
    const disabledProps = { ...mockProps, disabled: true };
    render(<ExceptionAvailability {...disabledProps} />);

    const deleteButtons = screen.getAllByTestId("delete-button");
    deleteButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
