import { render, screen, fireEvent } from "@testing-library/react";
import ExceptionAvailability from "./ExceptionAvailability";
import { DateTime } from "luxon";
import userEvent from "@testing-library/user-event";

const mockProps = {
  exceptionDates: [
    {
      special_date: "2025-02-28",
      start_time: "2025-02-28T09:00:00.000Z",
      end_time: "2025-02-28T17:00:00.000Z",
      is_available: true,
      availability_id: 1,
    },
    {
      special_date: "2025-03-01",
      is_available: false,
      availability_id: 2,
    },
  ],
  showModal: false,
  setShowModal: jest.fn(),
  selectedDate: undefined,
  setSelectedDate: jest.fn(),
  handleDelete: jest.fn(),
  disabled: false,
  setDisable: jest.fn(),
};


jest.mock("lucide-react", () => ({
    Trash2: () => <svg data-testid="trash-icon" />,
  }));

  
describe("ExceptionAvailability Component", () => {
  test("renders the component correctly", () => {
    render(<ExceptionAvailability {...mockProps} />);
    expect(screen.getByText("Date-Specific Hours")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Override your availability / unavailability for specific dates when your hours differ from your regular weekly hours."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("+ Add date-specific hours")).toBeInTheDocument();
  });

  test("displays exception dates correctly", () => {
    render(<ExceptionAvailability {...mockProps} />);
    expect(screen.getByText("2025-02-28")).toBeInTheDocument();
    expect(screen.getByText(DateTime.fromISO("2025-02-28T09:00:00.000Z").toFormat("hh:mm a"))).toBeInTheDocument();
    expect(screen.getByText(DateTime.fromISO("2025-02-28T17:00:00.000Z").toFormat("hh:mm a"))).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("2025-03-01")).toBeInTheDocument();
    expect(screen.getByText("Not Available")).toBeInTheDocument();
  });

  test("calls setShowModal when add button is clicked", () => {
    render(<ExceptionAvailability {...mockProps} />);
    const addButton = screen.getByText("+ Add date-specific hours");
    fireEvent.click(addButton);
    expect(mockProps.setShowModal).toHaveBeenCalledWith(true);
  });

  test("calls handleDelete and setDisable when delete button is clicked", async() => {
    const user=userEvent.setup();
    render(<ExceptionAvailability {...mockProps} />);
    const deleteButtons = screen.getAllByTestId("delete-button");
    await user.click(deleteButtons[0]);
    expect(mockProps.handleDelete).toHaveBeenCalledWith(1);
    expect(mockProps.setDisable).toHaveBeenCalledWith(true);
  });
});
