import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Auth from "../../../../src/pages/login/[[...slug]]";
import Login from "components/Auth/Login";
import "@testing-library/jest-dom";

describe("Auth Page", () => {
  it("should render login page correctly", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Login");
    const header = screen.getByText("Welcome back!");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });


  //Test successful login
  it("Successful Login", async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Login");

    fireEvent.change(emailInput, { target: { value: "newuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Add assertions to check for successful login
    await screen.findByText("Welcome, User");
  });


  //Test unsuccessful login
  it ("Unsuccessful Login", async() =>{
    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("Login");

    fireEvent.change(emailInput, { target: { value: "invalid@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await screen.getByText("Invalid email or password!");
    
  })


  it("should render register page correctly", () => {});
  it("should enter registration information properly", () => {


    // Test invalid fields
    // Test email taken
    // Test successful registration
  });
});

