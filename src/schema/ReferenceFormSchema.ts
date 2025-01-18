import { z, ZodType } from "zod";
import { FormData } from "../types/types";

const employerSchema = z.object({
  name: z
    .string()
    .min(2, "Employer name should be at least 2 characters")
    .max(50, "Employer name should be no more than 50 characters"),
  start_date: z.string(),
  end_date: z.string(),
});

export const ReferenceFormSchema: ZodType<FormData> = z.object({
  first_name: z
    .string()
    .min(2, "First name should be at least 2 characters")
    .max(50, "First name should be no more than 50 characters"),
  last_name: z
    .string()
    .min(2, "Last name should be at least 2 characters")
    .max(50, "Last name should be no more than 50 characters"),
  current_address: z
    .string()
    .min(2, "Address should be at least 2 characters")
    .max(50, "Address should be no more than 50 characters"),
  employer: z.array(employerSchema),
  guarantor_name: z
    .string()
    .min(2, "Guarantor name should be at least 2 characters")
    .max(50, "Guarantor name should be no more than 50 characters"),
  guarantor_address: z
    .string()
    .min(2, "Guarantor address should be at least 2 characters")
    .max(50, "Guarantor address should be no more than 50 characters"),
  guarantor_relation: z.string(),
});
