# Goodlord Tech Test

Using Vite + Node v20

Deployed to Vercel - [goodlord-referencing.vercel.app](https://goodlord-referencing.vercel.app/)

## Task

### Take-home test (part 1)

Before tenants can move into a new property we usually need to do a reference check. This
involves gathering information about their employment, income, credit history, previous
tenancies, etc and running it through our referencing checks.

We want you to build a form that captures this information and submits it to our (fictional)
reference api endpoint: https://ref-api.goodlord.co/reference/new.

Create a form that collects the following information and submits it to the api:
**Personal**
First name
Last name
Current address

**Employer**
Employer name
Employment start date
Employment end date (no end date if current employment)

### Live coding challenge (part 2)

If the employment date range provided is less than 3 years in length, the user should be prompted to provide additional employer details. Add functionality to allow the user to add a new employer field row.

### API definition

---

## Installation

- Install dependencies with `pnpm i`
- Run the application with `pnpm run dev` to start the local server.
- Run the Jest test runner with `pnpm run test`

## Dependencies

- **react-hook-form** to handle form input capturing and validation.
- **jest** + **react-testing-library** to run unit tests (with identity-obj-proxy to handle CSS modules)
- **react-query** to handle API calls (with fetch) to the Goodlord mock API.
