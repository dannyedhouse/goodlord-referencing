import { calculateInvalidEmployerDates } from "./calculateInvalidEmploymentDates";

describe("calculateInvalidEmployerDates", () => {
  it("should return true for invalid date range (<36 months)", () => {
    const result = calculateInvalidEmployerDates([
      {
        name: "employer",
        start_date: "2024-01-30",
        end_date: "2025-01-30",
      },
    ]);

    expect(result).toBe(true);
  });

  it("should return false for valid date range (>36 months)", () => {
    const result = calculateInvalidEmployerDates([
      {
        name: "employer",
        start_date: "2020-01-30",
        end_date: "2025-01-30",
      },
    ]);

    expect(result).toBe(false);
  });
});
