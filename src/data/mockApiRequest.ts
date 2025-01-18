import { APIReferenceData } from "../types/types";

export const mockData: APIReferenceData = {
  personal: {
    first_name: "Danny",
    last_name: "Edhouse",
    current_address: "Goodlord HQ, 2 Whitechapel Rd, London E1 1EW",
  },
  employer: [
    { name: "Goodlord", start_date: "2024-01-01", end_date: "2024-01-31" },
  ],
  // guarantor: {
  //   name: "Bob",
  //   address: "123 London Street",
  //   relation: "Sibling",
  // },
};
