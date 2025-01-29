import { FormData } from "../types/types";

/**
 * Returns true if provided employer dates are less than 36 months.
 */
export function calculateInvalidEmployerDates(employers: FormData["employer"]) {
  let totalMonths = 0;
  employers.forEach(({ start_date, end_date }) => {
    if (start_date) {
      const start = new Date(start_date);
      const end = end_date ? new Date(end_date) : new Date();
      totalMonths +=
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
    }
  });
  return totalMonths < 36;
}
