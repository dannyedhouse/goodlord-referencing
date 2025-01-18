import { APIReferenceData, FormData } from "../types/types";

export const convertReferenceFormData = (data: FormData): APIReferenceData => {
  return {
    personal: {
      first_name: data.first_name,
      last_name: data.last_name,
      current_address: data.current_address,
    },
    employer: data.employer.map((employer) => ({
      name: employer.name,
      start_date: formatDate(employer.start_date),
      end_date: formatDate(employer.end_date),
    })),
    // guarantor: {
    //   name: data.guarantor_name,
    //   address: data.guarantor_address,
    //   relation: data.guarantor_relation,
    // },
  };
};

export const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};
