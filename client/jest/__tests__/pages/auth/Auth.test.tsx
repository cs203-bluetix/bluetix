import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "components/Auth/Login";
import { act } from "react-dom/test-utils";

describe("Auth Page", () => {
  it("should render login page correctly", () => {});
  it("enter login credentials properly", async () => {
    // Test wrong email/password
    // Test successful login

    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "hi@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password12345" } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    screen.debug(undefined, Infinity);

    await act(async () => {
      fireEvent.click(submitButton);
    });
  });
  it("should render register page correctly", () => {});
  it("should enter registration information properly", () => {
    // Test invalid fields
    // Test email taken
    // Test successful registration
  });
});
