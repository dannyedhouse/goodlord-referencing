import { fireEvent, screen, waitFor } from "@testing-library/react";
import ReferenceForm from "./ReferenceForm";
import renderWithQueryClientProvider from "../../utils/renderWithQueryClientProvider";
import { mockData } from "../../data/mockApiRequest";

global.fetch = jest.fn();

function fillInReferenceForm() {
  fireEvent.change(screen.getByLabelText(/First Name/i), {
    target: { value: "Danny" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name/i), {
    target: { value: "Edhouse" },
  });
  fireEvent.change(screen.getAllByLabelText(/Address/i)[0], {
    target: { value: "Goodlord HQ, 2 Whitechapel Rd, London E1 1EW" },
  });

  fireEvent.change(screen.getByLabelText(/Employer name/i), {
    target: { value: "Goodlord" },
  });
  fireEvent.change(screen.getByLabelText(/Employment start date/i), {
    target: { value: "2025-01-01" },
  });
  fireEvent.change(screen.getByLabelText(/Employment end date/i), {
    target: { value: "2025-01-31" },
  });

  fireEvent.change(screen.getByLabelText(/Guarantor name/i), {
    target: { value: "Bob" },
  });
  fireEvent.change(screen.getByLabelText(/Guarantor address/i), {
    target: { value: "London Road" },
  });
}

describe("ReferenceForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    window.scrollTo = jest.fn();
  });

  it("renders form with submit button disabled by default", () => {
    renderWithQueryClientProvider(<ReferenceForm />);

    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });

  it("should show validation error message when field is touched without entering a value", async () => {
    renderWithQueryClientProvider(<ReferenceForm />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.blur(firstNameInput);

    await waitFor(() => {
      expect(
        screen.getByText(/First name should be at least 2 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("should submit and show success screen when all fields are filled out", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => mockData,
    });

    renderWithQueryClientProvider(<ReferenceForm />);

    fillInReferenceForm();

    const submitButton = screen.getByText(/Submit/i);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
      expect(
        screen.getByText(
          /Your reference has been submitted. Your letting agent will be in contact soon/i
        )
      ).toBeInTheDocument();
    });
  });

  it("should show error message if reference request fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Error"));

    renderWithQueryClientProvider(<ReferenceForm />);

    fillInReferenceForm();

    const submitButton = screen.getByText(/Submit/i);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
      expect(
        screen.getByText(/Sorry, an error occured. Please try again./i)
      ).toBeInTheDocument();
    });
  });
});
