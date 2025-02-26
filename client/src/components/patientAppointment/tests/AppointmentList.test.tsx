import { render, screen } from "@testing-library/react";
import AppointmentList from "../appointmentList";
import { Appointment } from "@/containers/patient/types"; // Adjust the import path as needed

// Mock the AppointmentCard component
jest.mock("../appointmentCard", () => ({
  __esModule: true,
  default: jest.fn(({ appointment }) => (
    <div data-testid="appointment-card">{appointment.doctor.user.name}</div>
  )),
}));

describe("AppointmentList Component", () => {
  // Define mock appointments that match the Appointment type
  const mockAppointments: Appointment[] = [
    {
      __typename: "Appointment",
      appointment_date: "2023-10-15T10:00:00.000Z",
      start_time: "10:00:00",
      end_time: "11:00:00",
      patient_time_zone: "UTC",
      status: "pending",
      doctor: {
        __typename: "Doctor",
        user: {
          __typename:"User",
          name: "Tanishq",
          phone_number: "+1234567890",
          email:"tanishq@gmail.com"

        },
      },
    },
    {
      __typename: "Appointment",
      appointment_date: "2023-10-16T11:00:00.000Z",
      start_time: "11:00:00",
      end_time: "12:00:00",
      patient_time_zone: "UTC",
      status: "approved",
      doctor: {
        __typename: "Doctor",
        user: {
          __typename:"User",
          name: "John Doe",
          phone_number: "+1234567890",
          email:"tanishq2@gmail.com"

        },
      },
    },
  ];

  test("renders appointment cards when appointments are provided", () => {
    render(<AppointmentList appointments={mockAppointments} />);

    // Check if the correct number of appointment cards are rendered
    const appointmentCards = screen.getAllByTestId("appointment-card");
    expect(appointmentCards).toHaveLength(2);

    // Check if the appointment IDs are displayed correctly
    expect(appointmentCards[0]).toHaveTextContent("Tanishq");
    expect(appointmentCards[1]).toHaveTextContent("John Doe");
  });

  test("displays 'No appointments found' when the list is empty", () => {
    render(<AppointmentList appointments={[]} />);

    // Check if the "No appointments found" message is displayed
    expect(screen.getByText("No appointments found")).toBeInTheDocument();
  });
});