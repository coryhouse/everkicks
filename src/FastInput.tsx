import { useState } from "react";
import { FieldName, FormStatus, ValidateFunction } from "./FastForm";
import "./FastInput.css";

type FastInputProps = {
  /** Field's name */
  name: FieldName;

  /** The form's submission status */
  formStatus: FormStatus;

  /** Input label */
  label: string;

  /** Input ID - Used to associated the label and input. */
  id: string;

  /** Function to execute to determine if the field is valid */
  validate: ValidateFunction;
};

export default function FastInput({
  name,
  formStatus,
  id,
  label,
  validate,
}: FastInputProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  // Derived state
  // Note: This is efficient because it only runs when the user interacts with this field.
  const error = validate(name, value);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onBlur={() => setTouched(true)}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && (touched || formStatus === "Submitted") && (
        <p role="alert">{error}</p>
      )}
    </div>
  );
}
