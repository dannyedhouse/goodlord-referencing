import { useState } from "react";
import styles from "./ReferenceForm.module.css";
import SuccessScreen from "./SuccessScreen";

export default function ReferenceForm() {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  function onSubmit() {
    setShowSuccess(true);
  }

  return showSuccess ? (
    <SuccessScreen onClose={() => setShowSuccess(false)} />
  ) : (
    <div className="container">
      <h1>Goodlord Referencing Form</h1>
      <p>* indicates a required field</p>

      <form className={styles.referenceForm} onSubmit={onSubmit}>
        <div className={styles.formSection}>
          <b>Personal</b>
          <label htmlFor="first_name">First Name*</label>
          <input id="first_name" type="text" />
        </div>

        <div className={styles.cta}>
          <a href="/">Cancel</a>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
