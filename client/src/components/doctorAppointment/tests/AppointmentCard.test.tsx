import { render, screen } from "@testing-library/react";
import AppointmentCard from "../index";
import { DateTime } from "luxon";

const mockAppointment = {
  appointment_id: 1,
  patient_id: 1,
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone_number: "123-456-7890",
  },
  appointment_date: "2023-10-10T10:00:00Z",
  start_time: "10:00",
  end_time: "11:00",
  patient_time_zone: "UTC",
  status: "pending",
};

jest.mock("lucide-react", () => ({
  Calendar: jest.fn(() => <div>Trash2</div>),
  Clock: jest.fn(() => <div>Clock</div>),
  Mail: jest.fn(() => <div>Mail</div>),
  Phone: jest.fn(() => <div>Phone</div>),
  User: jest.fn(() => <div>User</div>),
  Video: jest.fn(() => <div>Video</div>),
  CheckCircle: jest.fn(() => <div>CheckCircle</div>),
}));

const mockFormatTime = (
  date: string,
  time: string,
  timeZone: string
): string => {
  return DateTime.fromISO(`${date}T${time}`)
    .setZone(timeZone)
    .toLocaleString(DateTime.TIME_SIMPLE);
};

describe("Doctor Appointment Card", () => {
  it("renders AppointmentCard with correct details", () => {
    render(
      <AppointmentCard
        appointment={mockAppointment}
        onAccept={() => {}}
        onReject={() => {}}
        onComplete={() => {}}
        getStatusColor={() => "bg-green-500"}
        formatTime={mockFormatTime}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
  });

  it("renders Accept and Reject buttons for pending appointments", () => {
    render(
      <AppointmentCard
        appointment={mockAppointment}
        onAccept={() => {}}
        onReject={() => {}}
        onComplete={() => {}}
        getStatusColor={() => "bg-yellow-500"}
        formatTime={mockFormatTime}
      />
    );

    expect(screen.getByText("Accept")).toBeInTheDocument();
    expect(screen.getByText("Reject")).toBeInTheDocument();
  });

  it("renders Join Meeting and Mark as Complete buttons for approved appointments", () => {
    const approvedAppointment = { ...mockAppointment, status: "approved" };

    render(
      <AppointmentCard
        appointment={approvedAppointment}
        onAccept={() => {}}
        onReject={() => {}}
        onComplete={() => {}}
        getStatusColor={() => "bg-green-500"}
        formatTime={mockFormatTime}
      />
    );

    expect(screen.getByText("Join Meeting")).toBeInTheDocument();
    expect(screen.getByText("Mark as Complete")).toBeInTheDocument();
  });

  it("renders Join Meeting and Mark as Complete buttons for approved appointments", () => {
    const approvedAppointment = { ...mockAppointment, status: "approved" };

    render(
      <AppointmentCard
        appointment={approvedAppointment}
        onAccept={() => {}}
        onReject={() => {}}
        onComplete={() => {}}
        getStatusColor={() => "bg-green-500"}
        formatTime={mockFormatTime}
      />
    );

    expect(screen.getByText("Join Meeting")).toBeInTheDocument();
    expect(screen.getByText("Mark as Complete")).toBeInTheDocument();
  });
});
