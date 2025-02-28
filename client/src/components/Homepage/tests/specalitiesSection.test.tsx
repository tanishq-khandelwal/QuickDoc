import { render, screen } from "@testing-library/react";
import SpecialitiesSection from "../specalitiesSection/specalitiesSection";
import "@testing-library/jest-dom";

describe("Specialities Section Component Test", () => {

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<SpecialitiesSection />);
    expect(spy).not.toHaveBeenCalled();
  });


  it("Renders section title correctly", () => {
    render(<SpecialitiesSection />);  
    expect(
      screen.getByText("Consult top doctors online for any health concern")
    ).toBeInTheDocument();
  });

  it("Renders all speciality cards with correct titles", () => {
    render(<SpecialitiesSection />);  
    const specialities = [
      "Period doubts or Pregnancy",
      "Acne, pimple or skin issues",
      "Performance issues in bed",
      "Cold, cough or fever",
      "Child not feeling well",
      "Depression or anxiety",
    ];

    specialities.forEach((speciality) => {
      expect(screen.getByText(speciality)).toBeInTheDocument();
    });
  });

  it("Renders images with correct alt text", () => {
    render(<SpecialitiesSection />);    
    expect(screen.getByAltText("Period doubts or Pregnancy")).toBeInTheDocument();
    expect(screen.getByAltText("Acne, pimple or skin issues")).toBeInTheDocument();
    expect(screen.getByAltText("Performance issues in bed")).toBeInTheDocument();
    expect(screen.getByAltText("Cold, cough or fever")).toBeInTheDocument();
    expect(screen.getByAltText("Child not feeling well")).toBeInTheDocument();
    expect(screen.getByAltText("Depression or anxiety")).toBeInTheDocument();
  });

  it("Renders 'CONSULT NOW' text for each speciality", () => {
    render(<SpecialitiesSection />);
    const consultNowButtons = screen.getAllByText("CONSULT NOW");
    expect(consultNowButtons.length).toBe(6);
  });
});
