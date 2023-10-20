import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventListPage from "../../../../src/pages/events/index";
describe("Event List page", () => {
  it("should render event list correctly", () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
    render(<EventListPage events={[]} venues={[]} />);

    const x = screen.getAllByText("Events")[0];
    expect(x).toBeInTheDocument();

    // 1. Correct Events listed
    // 2. Correct info on events
    // 3. Clicking event should redirect
  });
  it("search filter should work", () => {});
  it("date filter should work", () => {});
  it("location filter should work", () => {});
  it("price filter should work", () => {});
});
