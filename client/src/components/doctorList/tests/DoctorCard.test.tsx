import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DoctorCard from "../doctorCard";

jest.mock("lucide-react", () => ({
  User: jest.fn(() => <svg data-testid="user-icon" />),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("DoctorCard Component", () => {
  const mockDoctor = {
    doctor_id: 1,
    user: { name: "Dr. Tanishq Khandelwal" },
    specialization: "MBBS",
    experience_years: 8,
    city: "Pune",
    clinic_address: "Pune",
    created_at:"2025-02-21 08:56:54.079351",
    slot_duration:15,
    consultation_fee:500
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <MemoryRouter>
        <DoctorCard doctor={mockDoctor} />
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("renders doctor details correctly", () => {
    render(
      <MemoryRouter>
        <DoctorCard doctor={mockDoctor} />
      </MemoryRouter>
    );

    expect(screen.getByText("Dr. Tanishq Khandelwal")).toBeInTheDocument();
    expect(screen.getByText("Specialization: MBBS")).toBeInTheDocument();
    expect(screen.getByText("Experience: 8 years")).toBeInTheDocument();
    expect(screen.getByText("City: Pune")).toBeInTheDocument();
    expect(screen.getByText("Clinic Address: Pune")).toBeInTheDocument();
  });

  it("renders the User icon", () => {
    render(
      <MemoryRouter>
        <DoctorCard doctor={mockDoctor} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("navigates to doctor preview on 'Book Appointment' button click", () => {
    render(
      <MemoryRouter>
        <DoctorCard doctor={mockDoctor} />
      </MemoryRouter>
    );

    const bookButton = screen.getByText("Book Appointment");
    fireEvent.click(bookButton);

    expect(mockNavigate).toHaveBeenCalledWith("/doctorPreview?doctorId=1");
  });

  // it("renders a disabled 'Contact Clinic' button", () => {
  //   render(
  //     <MemoryRouter>
  //       <DoctorCard doctor={mockDoctor} />
  //     </MemoryRouter>
  //   );

  //   const contactButton = screen.getByText("Contact Clinic");
  //   expect(contactButton).toBeDisabled();
  // });
});
