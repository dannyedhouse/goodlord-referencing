import { APIReferenceData } from "../types/types";

const URL = "https://ref-api.goodlord.co/reference/new";

export async function submitReferenceData(
  formattedData: APIReferenceData
): Promise<APIReferenceData> {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error(
        `Error processing reference form: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (e) {
    throw new Error(`Error processing reference form: ${e}`);
  }
}
