import { render, screen, fireEvent } from "@testing-library/react";
import ProfileComponent from "./profileComponenet";
import userEvent from "@testing-library/user-event";

const mockHandleChange = jest.fn();
const mockHandleSave = jest.fn();

const mockFormData = {
  user: {
    name: "Dr. John Doe",
    email: "johndoe@example.com",
    phone_number: "1234567890",
  },
  experience_years: 10,
  specialization: "Cardiology",
  slot_duration: 30,
  consultation_fee: 100,
  city: "New York",
  clinic_address: "123, Medical Street, NY",
};

describe("ProfileComponent", () => {
    it('Expect to not log errors in console', () => {
        const spy = jest.spyOn(global.console, 'error');
        render(<ProfileComponent formData={null} isEdited={false} handleChange={mockHandleChange} handleSave={mockHandleSave} loading={false}/>);
        expect(spy).not.toHaveBeenCalled();
      });

  it("renders 'No doctor profile found' when formData is null", () => {
    render(<ProfileComponent formData={null} isEdited={false} handleChange={mockHandleChange} handleSave={mockHandleSave} loading={false}/>);
    expect(screen.getByText("No doctor profile found.")).toBeInTheDocument();
  });

  it("renders doctor profile details when formData is provided", () => {
    render(<ProfileComponent formData={mockFormData} isEdited={false} handleChange={mockHandleChange} handleSave={mockHandleSave} loading={false} />);
    expect(screen.getByDisplayValue("Dr. John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
  });

  it("calls handleChange when editable fields are changed", () => {
    render(<ProfileComponent formData={mockFormData} isEdited={true} handleChange={mockHandleChange} handleSave={mockHandleSave} loading={false} />);
    const experienceInput = screen.getByDisplayValue("10");
    fireEvent.change(experienceInput, { target: { value: "15" } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("save button is disabled when isEdited is false", () => {
    render(<ProfileComponent formData={mockFormData} isEdited={false} handleChange={mockHandleChange} handleSave={mockHandleSave} loading={false} />);
    expect(screen.getByText("Save")).toBeDisabled();
  });

  it("save button is enabled when isEdited is true", () => {
    render(<ProfileComponent formData={mockFormData} isEdited={true} handleChange={mockHandleChange} handleSave={mockHandleSave} loading={false}/>);
    expect(screen.getByText("Save")).not.toBeDisabled();
  });

  it("calls handleSave when save button is clicked", async() => {
    const user=userEvent.setup();
    render(<ProfileComponent formData={mockFormData} isEdited={true} handleChange={mockHandleChange} handleSave={mockHandleSave} loading={false}/>);
    await user.click(screen.getByText("Save"));
    expect(mockHandleSave).toHaveBeenCalled();
  });
});
