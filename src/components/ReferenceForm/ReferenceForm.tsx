import { useState } from "react";
import styles from "./ReferenceForm.module.css";
import SuccessScreen from "./SuccessScreen";
import FormField from "../FormField/FormField";
import { useForm } from "react-hook-form";
import { ReferenceFormSchema } from "../../schema/ReferenceFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "../../types/types";
import { convertReferenceFormData } from "../../lib/ReferenceFormHelper";

export default function ReferenceForm() {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(ReferenceFormSchema),
    mode: "onTouched",
  });

  const { isValid, errors, touchedFields } = formState;

  function onSubmit(data: FormData) {
    const formattedData = convertReferenceFormData(data);
    console.log(data);
    console.log(formattedData);
    setShowSuccess(true);
    reset();
  }

  return showSuccess ? (
    <SuccessScreen onClose={() => setShowSuccess(false)} />
  ) : (
    <div className="container">
      <h1>Goodlord Referencing Form</h1>
      <p>* indicates a required field</p>

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
          <FormField
            className="full-width"
            type="text"
            id="employer.0.name"
            name="employer.0.name"
            labelText="Employer name"
            required
            register={register}
            error={errors.employer?.[0]?.name}
            touched={touchedFields.employer?.[0].name}
          />

          <div className={styles.inputGroup}>
            <FormField
              className={styles.dateField}
              type="date"
              id="employer.0.start_date"
              name="employer.0.start_date"
              labelText="Employment start date"
              required
              register={register}
              error={errors.employer?.[0]?.start_date}
              touched={touchedFields.employer?.[0].start_date}
            />
            <FormField
              className={styles.dateField}
              type="date"
              id="employer.0.end_date"
              name="employer.0.end_date"
              labelText="Employment end date"
              register={register}
              error={errors.employer?.[0]?.end_date}
              touched={touchedFields.employer?.[0].end_date}
            />
          </div>
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
            // className="half-width"
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
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
