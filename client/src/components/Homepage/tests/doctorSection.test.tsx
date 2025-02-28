import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DoctorsSection from "../doctorSection/doctorSection";

const doctors = [
  {
    id: 1,
    title: "Dentist",
    desc: "Teething troubles?Schedule a dental checkup",
    url: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dentist@2x.jpg",
  },
  {
    id: 2,
    title: "Gynecologist",
    desc: "Explore for women's health,pregnancy and infertility treatments",
    url: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-gynecologist@2x.jpg",
  },
  {
    id: 3,
    title: "Dietitian/Nutrition",
    desc: "Get guidance on eathing right,weight management",
    url: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-dietitian@2x.jpg",
  },
  {
    id: 4,
    title: "Physiotherapist",
    desc: "Pulled a muscle?Get it treated by trained physiotherapist",
    url: "https://www.practostatic.com/consumer-home/desktop/images/1558283618/sp-physiotherapist@2x.jpg",
  },
];

describe("DoctorsSection Component", () => {

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<DoctorsSection />);
    expect(spy).not.toHaveBeenCalled();
  });


  it("renders the section headings", () => {
    render(<DoctorsSection />);
    expect(
      screen.getByText("Book an appointment for an in-clinic consultation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Find experienced doctors across all specialties")
    ).toBeInTheDocument();
  });

  it("renders all doctors", () => {
    render(<DoctorsSection />);
    doctors.forEach((doctor) => {
      expect(screen.getByText(doctor.title)).toBeInTheDocument();
      expect(screen.getByText(doctor.desc)).toBeInTheDocument();
      expect(screen.getByAltText(doctor.title)).toBeInTheDocument();
    });
  });

  it("renders images with correct src attributes", () => {
    render(<DoctorsSection />);
    doctors.forEach((doctor) => {
      const imgElement = screen.getByAltText(doctor.title);
      expect(imgElement).toHaveAttribute("src", doctor.url);
    });
  });
});
