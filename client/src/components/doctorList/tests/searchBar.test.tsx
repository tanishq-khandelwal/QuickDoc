import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../searchBar";

describe("SearchBar Component", () => {
  let mockSetSearchQuery: jest.Mock;

  beforeEach(() => {
    mockSetSearchQuery = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(
      <SearchBar searchQuery="Tanishq" setSearchQuery={mockSetSearchQuery} />
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it("renders the input field correctly", () => {
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);
    const inputElement = screen.getByPlaceholderText("Search for doctors...");
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the correct initial value", () => {
    render(
      <SearchBar searchQuery="Tanishq" setSearchQuery={mockSetSearchQuery} />
    );
    const inputElement = screen.getByPlaceholderText(
      "Search for doctors..."
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("Tanishq");
  });

  it("calls setSearchQuery when the user types", () => {
    render(<SearchBar searchQuery="" setSearchQuery={mockSetSearchQuery} />);
    const inputElement = screen.getByPlaceholderText("Search for doctors...");

    fireEvent.change(inputElement, { target: { value: "Tanishq" } });

    expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
    expect(mockSetSearchQuery).toHaveBeenCalledWith("Tanishq");
  });
});
