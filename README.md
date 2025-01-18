# Goodlord Tech Test

Using Vite + Node v20

Deployed to Vercel - [goodlord-referencing.vercel.app](https://goodlord-referencing.vercel.app/)

## Installation

- Install dependencies with `pnpm i`
- Run the application with `pnpm run dev` to start the local server.
- Run the Jest test runner with `pnpm run test`

## Dependencies

- **react-hook-form** to handle form input capturing and validation.
- **jest** + **react-testing-library** to run unit tests (with identity-obj-proxy to handle CSS modules)
- **react-query** to handle API calls (with fetch) to the Goodlord mock API.

## Future improvements

- Add more tests, particularly around the API - perhaps mocking with MSW.
- Improved validation
  - e.g., ensuring that the start date cannot be before the end date.
- Add endpoint to env variables
- Clarify if guarantor details should be submit/processed. This has been left commented to ensure it meets Task 1 requirements.
