import { render, screen } from "@testing-library/react";
import AppointmentList from "../appointmentList";
import { Appointment } from "../types";

// Mock the AppointmentCard component
jest.mock("../appointmentCard", () => ({
  __esModule: true,
  default: jest.fn(({ appointment }) => (
    <div data-testid="appointment-card">{appointment.doctor.user.name}</div>
  )),
}));

describe("AppointmentList Component", () => {

  const mockAppointments: Appointment[] = [
    {
      __typename: "Appointment",
      appointment_id:1,
      appointment_date: "2023-10-15T10:00:00.000Z",
      start_time: "10:00:00",
      end_time: "11:00:00",
      patient_time_zone: "UTC",
      status: "pending",
      doctor: {
        __typename: "Doctor",
        user: {
          __typename: "User",
          name: "Tanishq",
          phone_number: "+1234567890",
          email: "tanishq@gmail.com",
        },
      },
    },
    {
      __typename: "Appointment",
      appointment_id:2,
      appointment_date: "2023-10-16T11:00:00.000Z",
      start_time: "11:00:00",
      end_time: "12:00:00",
      patient_time_zone: "UTC",
      status: "approved",
      doctor: {
        __typename: "Doctor",
        user: {
          __typename: "User",
          name: "John Doe",
          phone_number: "+1234567890",
          email: "tanishq2@gmail.com",
        },
      },
    },
  ];

  test("renders appointment cards when appointments are provided", () => {
    render(<AppointmentList appointments={mockAppointments} />);

    
    const appointmentCards = screen.getAllByTestId("appointment-card");
    expect(appointmentCards).toHaveLength(2);

   
    expect(appointmentCards[0]).toHaveTextContent("Tanishq");
    expect(appointmentCards[1]).toHaveTextContent("John Doe");
  });

  test("displays 'No appointments found' when the list is empty", () => {
    render(<AppointmentList appointments={[]} />);


    expect(screen.getByText("No appointments found")).toBeInTheDocument();
  });
});
