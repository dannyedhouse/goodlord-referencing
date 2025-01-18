import { convertReferenceFormData, formatDate } from "./ReferenceFormHelper";

describe("ReferenceFormHelper", () => {
  it("should map form data correctly", () => {
    const formData = {
      first_name: "Danny",
      last_name: "Edhouse",
      current_address: "Goodlord HQ, 2 Whitechapel Rd, London E1 1EW",
      employer: [
        { name: "Goodlord", start_date: "2025-01-01", end_date: "2025-01-31" },
      ],
      guarantor_name: "Bob",
      guarantor_address: "11 London Road",
      guarantor_relation: "Sibling",
    };

    const expectedOutput = {
      personal: {
        first_name: "Danny",
        last_name: "Edhouse",
        current_address: "Goodlord HQ, 2 Whitechapel Rd, London E1 1EW",
      },
      employer: [
        { name: "Goodlord", start_date: "20250101", end_date: "20250131" },
      ],
    };

    const result = convertReferenceFormData(formData);
    expect(result).toEqual(expectedOutput);
  });

  it("formatDate function should correctly format date (YYYMMDD) for the api", () => {
    const inputDate = "2021-01-01";
    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toBe("20210101");
  });
});
