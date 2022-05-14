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

  // Note: This is efficient because it only runs when the user interacts with this field.
  const error = validate(name, value);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        name={name}
        onBlur={() => setTouched(true)}
        // NOTE that this input is UNCONTROLLED because it DOES NOT specify a value.
        // There's no need for React to control the value since we're reading
        // form values via the onChange. (Uncontrolled is also faster)
        // Need to keep value though so we can update the validation message
        // on each keystroke.
        onChange={(e) => setValue(e.target.value)}
      />
      {error && (touched || formStatus === "Submitted") && (
        <p role="alert">{error}</p>
      )}
    </div>
  );
}
