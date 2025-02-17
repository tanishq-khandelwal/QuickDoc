import {screen,render} from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchSection from "./searchSection";

describe("Search Section Component Test",()=>{

    it('Expect to not log errors in console', () => {
        const spy = jest.spyOn(global.console, 'error');
        render(<SearchSection />);
        expect(spy).not.toHaveBeenCalled();
      });


    it("Renders search input fields",()=>{
        render(<SearchSection/>);

        const locationInput=screen.getByPlaceholderText("Search location");
        const doctorInput=screen.getByPlaceholderText("Search doctors, clinics, hospitals, etc.");

        expect(locationInput).toBeInTheDocument();
        expect(doctorInput).toBeInTheDocument();
    });


})