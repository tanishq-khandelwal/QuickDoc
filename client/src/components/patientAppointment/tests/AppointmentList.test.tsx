import { render, screen } from "@testing-library/react";
import AppointmentList from "../appointmentList";


jest.mock("../appointmentCard", () => ({
  __esModule: true,
  default: jest.fn(({ appointment }) => <div data-testid="appointment-card">{appointment.appointment_id}</div>),
}));

describe("AppointmentList Component", () => {
  test("renders appointment cards when appointments are provided", () => {
    const appointments = [
      { appointment_id: "1", name: "John Doe" },
      { appointment_id: "2", name: "Jane Doe" },
    ];

    render(<AppointmentList appointments={appointments} />);

    const appointmentCards = screen.getAllByTestId("appointment-card");
    expect(appointmentCards).toHaveLength(2);
    expect(appointmentCards[0]).toHaveTextContent("1");
    expect(appointmentCards[1]).toHaveTextContent("2");
  });

  test("displays 'No appointments found' when the list is empty", () => {
    render(<AppointmentList appointments={[]} />);

    expect(screen.getByText("No appointments found")).toBeInTheDocument();
  });
});
