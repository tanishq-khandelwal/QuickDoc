import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer/Footer";

describe("Footer Component", () => {
  it("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<Footer />);
    expect(spy).not.toHaveBeenCalled();
  });

  it("renders the footer with all sections", () => {
    render(<Footer />);

    expect(
      screen.getByRole("heading", { name: /about us/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /quick links/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /contact/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/We provide trusted healthcare services/i)
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /find a doctor/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /consultation/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /contact us/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/support@QuickDoc.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 123 456 7890/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} QuickDoc. All rights reserved.`
      )
    ).toBeInTheDocument();
  });
});
