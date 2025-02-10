import {screen,render} from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchSection from "./searchSection";

describe("Search Section Component Test",()=>{
    it("Renders search input fields",()=>{
        render(<SearchSection/>);

        const locationInput=screen.getByPlaceholderText("Search location");
        const doctorInput=screen.getByPlaceholderText("Search doctors, clinics, hospitals, etc.");

        expect(locationInput).toBeInTheDocument();
        expect(doctorInput).toBeInTheDocument();
    });

    it()

})