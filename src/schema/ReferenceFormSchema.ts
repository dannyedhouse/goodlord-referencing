import { z, ZodType } from "zod";
import { FormData } from "../types/types";

const employerSchema = z.object({
  name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});

export const ReferenceFormSchema: ZodType<FormData> = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  current_address: z.string().min(2).max(50),
  employer: z.array(employerSchema),
  guarantor_name: z.string().min(2).max(50),
  guarantor_address: z.string().min(2).max(50),
  guarantor_relation: z.string().min(2).max(50),
});
