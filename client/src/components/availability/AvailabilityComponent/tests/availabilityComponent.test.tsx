import { render, screen } from "@testing-library/react";
import AvailabilityComponent from "..";

describe("AvailabilityComponent", () => {
  const defaultProps = {
    weekDays: [
      { id: 1, title: "Monday" },
      { id: 2, title: "Tuesday" },
    ],
    availability: {
      monday: { selected: false, startTime: "09:00 AM", endTime: "05:00 PM" },
      tuesday: { selected: false, startTime: "09:00 AM", endTime: "05:00 PM" },
    },
    timeSlots: ["09:00 AM", "10:00 AM", "11:00 AM"],
    toggleDropdown: jest.fn(),
    handleTimeChange: jest.fn(),
    errors: {},
    setAvailability: jest.fn(),
  };

  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<AvailabilityComponent {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it("renders AvailabilityComponent with default props", () => {
    render(<AvailabilityComponent {...defaultProps} />);
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getAllByText("Unavailable").length).toBe(2);
  });

  it("renders with no errors", () => {
    render(<AvailabilityComponent {...defaultProps} />);
    expect(screen.queryByText("Invalid time range")).not.toBeInTheDocument();
  });

  it("renders with all days unavailable", () => {
    render(<AvailabilityComponent {...defaultProps} />);
    expect(screen.getAllByText("Unavailable").length).toBe(2);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<AvailabilityComponent {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
