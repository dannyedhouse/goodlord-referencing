import { FormData, ValidFieldNames } from "../../types/types";
import { FieldError, UseFormRegister } from "react-hook-form";
import styles from "./FormField.module.css";
import classNames from "classnames";

export type FormFieldProps = {
  className?: string;
  type: string;
  id: ValidFieldNames;
  name: ValidFieldNames;
  labelText: string;
  required?: boolean;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  touched?: boolean;
  options?: string[];
};

export default function FormField({
  className,
  type,
  id,
  name,
  labelText,
  required,
  register,
  error,
  touched,
  options,
}: FormFieldProps) {
  return (
    <div className={styles.formField}>
      <label htmlFor={id}>
        {labelText}
        {required && "*"}
      </label>

      {type === "select" ? (
        <select
          id={id}
          className={classNames(className, { "input-error": error && touched })}
          {...register(name)}
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          required={required}
          id={id}
          className={classNames(className, { "input-error": error && touched })}
          type={type}
          {...register(name)}
        />
      )}

      {error && touched && (
        <span className="error-message">{error.message}</span>
      )}
    </div>
  );
}
