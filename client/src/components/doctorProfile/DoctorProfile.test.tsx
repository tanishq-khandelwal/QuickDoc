import { render, screen } from "@testing-library/react";
import DoctorProfile from "./doctorProfile";

jest.mock("lucide-react", () => ({
  User: jest.fn(() => <svg data-testid="user-icon" />),
}));

describe("DoctorProfile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Expect to not log errors in console", () => {
    const mockData = {
      user: { name: "Dr. Tanishq Khandelwal" },
      specialization: "MBBS",
      experience_years: 10,
      city: "Pune",
      clinic_address: "Pune",
      consultation_fee: 500,
      slot_duration: 30,
    };

    const spy = jest.spyOn(global.console, "error");
    render(<DoctorProfile data={mockData} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it("renders doctor details correctly when data is provided", () => {
    const mockData = {
      user: { name: "Dr. Tanishq Khandelwal" },
      specialization: "MBBS",
      experience_years: 10,
      city: "Pune",
      clinic_address: "Pune",
      consultation_fee: 500,
      slot_duration: 30,
    };

    render(<DoctorProfile data={mockData} />);

    expect(screen.getByText("Dr. Tanishq Khandelwal")).toBeInTheDocument();
    expect(
      screen.getByText("Specialization: MBBS")
    ).toBeInTheDocument();
    expect(screen.getByText("Experience: 10 years")).toBeInTheDocument();
    expect(screen.getByText("City: Pune")).toBeInTheDocument();
    expect(
      screen.getByText("Clinic Address: Pune")
    ).toBeInTheDocument();
    expect(screen.getByText("₹500")).toBeInTheDocument();
    expect(screen.getByText("30 minutes")).toBeInTheDocument();
  });

  
});
