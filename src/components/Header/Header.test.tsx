import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("should render the header component", () => {
    render(<Header />);
  });
});
