import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ServicesSection from "../servicesSection/servicesSection";

describe("Service Section Component Test", () => {

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ServicesSection />);
    expect(spy).not.toHaveBeenCalled();
  });


  it("Renders all service cards correctly", () => {
    render(<ServicesSection />);
    expect(screen.getByText("Instant Video Consultation")).toBeInTheDocument();
    expect(screen.getByText("Find Doctors Near You")).toBeInTheDocument();
    expect(screen.getByText("Surgeries")).toBeInTheDocument();
  });

  it("Renders images with correct Alt text", () => {
    render(<ServicesSection />);
    expect(
      screen.getByAltText("Instant Video Consultation")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Find Doctors Near You")).toBeInTheDocument();
    expect(screen.getByAltText("Surgeries")).toBeInTheDocument();
  });
});
