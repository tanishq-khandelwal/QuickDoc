import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimezoneDropdown from "./TimeZoneDropDown";

describe.only("TimezoneDropdown Component", () => {
  it("renders dropdown with default value", () => {
    render(<TimezoneDropdown />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  it("contains correct timezone options", () => {
    render(<TimezoneDropdown />);
    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(1);
    expect(options[0]).toHaveTextContent("Select Timezone");
    expect(options.some((opt) => opt.textContent === "America/New_York")).toBeTruthy();
    expect(options.some((opt) => opt.textContent === "Asia/Calcutta")).toBeTruthy();
  });

  it("updates selected timezone on change", () => {
    render(<TimezoneDropdown />);
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "America/New_York" } });
    expect(selectElement).toHaveValue("America/New_York");
  });
});
