import { render, screen } from "@testing-library/react";
import Navbar from "../../../../src/components/Navbar/Navbar";
import "@testing-library/jest-dom";

describe("Navbar", () => {
  it("should display Navbar correctly", () => {
    render(<Navbar user={null} />);
    const about = screen.getByText("About"); 
    expect(about).toBeInTheDocument();

    const events = screen.getByText("Events"); 
    expect(events).toBeInTheDocument();

    const venues = screen.getByText("Venues");
    expect(venues).toBeInTheDocument();

    const FAQ = screen.getByText("FAQ");
    expect(FAQ).toBeInTheDocument();

    screen.debug(undefined, Infinity); 

  });

  it("clicking links should redirect to correct pages", () => {
    // Write your test logic for link redirection here
    
  });
});