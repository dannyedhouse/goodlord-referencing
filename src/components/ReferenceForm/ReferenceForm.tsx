import { Fragment, useState } from "react";
import styles from "./ReferenceForm.module.css";
import SuccessScreen from "./SuccessScreen";
import FormField from "../FormField/FormField";
import { useFieldArray, useForm } from "react-hook-form";
import { ReferenceFormSchema } from "../../schema/ReferenceFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "../../types/types";
import { convertReferenceFormData } from "../../lib/ReferenceFormHelper";
import { submitReferenceData } from "../../api/submitReference";
import { useMutation } from "react-query";
import { calculateInvalidEmployerDates } from "../../utils/calculateInvalidEmploymentDates";

export default function ReferenceForm() {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const defaultEmployer = {
    name: "",
    start_date: "",
    end_date: "",
  };
  const { register, handleSubmit, formState, reset, control, watch } =
    useForm<FormData>({
      resolver: zodResolver(ReferenceFormSchema),
      mode: "onTouched",
      defaultValues: {
        employer: [defaultEmployer],
      },
    });

  const {
    fields: employers,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "employer",
  });

  const { isValid, errors, touchedFields } = formState;

  const watchedEmployerFields = watch("employer");

  const { isLoading, mutate, isError } = useMutation(submitReferenceData, {
    onSuccess: (data) => {
      setShowSuccess(true);
      console.log("Response", data);
      reset();
    },
    onError: (error) => {
      console.log("Error submitting reference form", error);
      window.scrollTo(0, 0);
    },
  });

  async function onSubmit(data: FormData) {
    const formattedData = convertReferenceFormData(data);
    mutate(formattedData);
    console.log("Formatted data: ", formattedData);
  }

  const isEmploymentRangeInvalid = calculateInvalidEmployerDates(
    watchedEmployerFields
  );

  return showSuccess ? (
    <SuccessScreen onClose={() => setShowSuccess(false)} />
  ) : (
    <div className="container">
      <h1>Goodlord Referencing Form</h1>
      <p>* indicates a required field</p>

      {isError ? (
        <div className={styles.error}>
          <p>Sorry, an error occured. Please try again.</p>
        </div>
      ) : null}

      <form className={styles.referenceForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formSection}>
          <b>Personal</b>
          <FormField
            className="full-width"
            type="text"
            id="first_name"
            name="first_name"
            labelText="First Name"
            required
            register={register}
            error={errors.first_name}
            touched={touchedFields.first_name}
          />
          <FormField
            className="full-width"
            type="text"
            id="last_name"
            name="last_name"
            labelText="Last Name"
            required
            register={register}
            error={errors.last_name}
            touched={touchedFields.last_name}
          />
          <FormField
            className="full-width"
            type="text"
            id="current_address"
            name="current_address"
            labelText="Address"
            required
            register={register}
            error={errors.current_address}
            touched={touchedFields.current_address}
          />
        </div>

        <div className={styles.formSection}>
          <b>Employer</b>

          {employers.map((employer, index) => {
            const employerTouchedFields = touchedFields.employer?.[index] ?? {};

            return (
              <Fragment key={employer.id}>
                <FormField
                  className="full-width"
                  type="text"
                  id={`employer.${index}.name`}
                  name={`employer.${index}.name`}
                  labelText="Employer name"
                  required
                  register={register}
                  error={errors.employer?.[index]?.name}
                  touched={employerTouchedFields.name}
                />

                <div className={styles.inputGroup}>
                  <FormField
                    data-testid={`employer-${index}-start_date`}
                    className={styles.dateField}
                    type="date"
                    id={`employer.${index}.start_date`}
                    name={`employer.${index}.start_date`}
                    labelText="Employment start date"
                    required
                    register={register}
                    error={errors.employer?.[index]?.start_date}
                    touched={employerTouchedFields.start_date}
                  />
                  <FormField
                    data-testid={`employer-${index}-end_date`}
                    className={styles.dateField}
                    type="date"
                    id={`employer.${index}.end_date`}
                    name={`employer.${index}.end_date`}
                    labelText="Employment end date"
                    register={register}
                    error={errors.employer?.[index]?.end_date}
                    touched={employerTouchedFields.end_date}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className={styles.removeBtn}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </Fragment>
            );
          })}

          <button type="button" onClick={() => append(defaultEmployer)}>
            + Add employer
          </button>

          {isEmploymentRangeInvalid && (
            <p className={styles.error}>
              Please add 3 years of employment history.
            </p>
          )}
        </div>

        <div className={styles.formSection}>
          <b>Guarantor</b>
          <FormField
            className="full-width"
            type="text"
            id="guarantor_name"
            name="guarantor_name"
            labelText="Guarantor name"
            register={register}
            error={errors.guarantor_name}
            touched={touchedFields.guarantor_name}
          />
          <FormField
            className="full-width"
            type="text"
            id="guarantor_address"
            name="guarantor_address"
            labelText="Guarantor address"
            register={register}
            error={errors.guarantor_address}
            touched={touchedFields.guarantor_address}
          />
          <FormField
            type="select"
            id="guarantor_relation"
            name="guarantor_relation"
            labelText="Relationship to guarantor"
            register={register}
            error={errors.guarantor_relation}
            touched={touchedFields.guarantor_relation}
            options={["Parent", "Sibling", "Employer", "Other"]}
          />
        </div>

        <div className={styles.cta}>
          <a href="/">Cancel</a>
          <button
            className={styles.submitBtn}
            type="submit"
            disabled={!isValid || isEmploymentRangeInvalid}
          >
            {isLoading && <span className="loader"></span>}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
