export interface Personal {
  first_name: string;
  last_name: string;
  current_address: string;
}

export interface Employer {
  name: string;
  start_date: string;
  end_date: string;
}

export interface Guarantor {
  name: string;
  address: string;
  relation: string;
}

export interface FormData {
  first_name: string;
  last_name: string;
  current_address: string;
  employer: Employer[];
  guarantor_name: string;
  guarantor_address: string;
  guarantor_relation: string;
}

export type ValidFieldNames =
  | "first_name"
  | "last_name"
  | "current_address"
  | `employer.${number}.name`
  | `employer.${number}.start_date`
  | `employer.${number}.end_date`
  | "guarantor_name"
  | "guarantor_address"
  | "guarantor_relation";

export interface APIReferenceData {
  personal: Personal;
  employer: Employer[];
  guarantor: Guarantor;
}
