import { useState } from "react";
import FastInput from "./FastInput";

export type FormStatus = "Idle" | "Submitted" | "Completed";
export type FieldName = "firstName" | "email";
export type ValidateFunction = (name: FieldName, value: string) => string;

type FastFormProps = {
  slowComponent: React.ReactNode;
};

/**
 * The FastForm component takes the uncontrolled approach. Rather than keeping
 * track of all the values and passing the values to each field, we:
 * 1. Let the fields keep track of their own state.
 * 2. Retrieve the values via the browser's native form.elements in handleSubmit.
 */
export default function FastForm({ slowComponent }: FastFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("Idle");

  function validateRequired(value: string) {
    return value ? "" : "Required field.";
  }

  function validateEmail(value: string) {
    return value.includes("@") ? "" : "Email must have an @.";
  }

  // Validate the provided field/value combination
  const validate: ValidateFunction = (fieldName: FieldName, value: string) => {
    switch (fieldName) {
      case "firstName":
        return validateRequired(value);
      case "email":
        return validateEmail(value);
    }
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("Submitted");

    // Since the fields all manage their own state, read form data from form's event
    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(formData.entries());

    /**
     * Since each field performs its own validation:
     * 1. Iterate over all submitted fields
     * 2. Call the validate function for each (the same func used by each field)
     **/
    const formIsValid = Object.entries(fields).every(([fieldName, value]) => {
      return !validate(fieldName as FieldName, value.toString());
    });

    if (formIsValid) {
      console.log(`Fast Form Submitted`, fields);
      setFormStatus("Completed");
      /**
       * The current approach stops rendering the form upon successful submission.
       * This resets the fields.
       * If you want to keep displaying the fields after submission, but support a reset:
       * (Native browser reset via `event.currentTarget.reset()` isn't sufficient since we need to reset each FastInput's internal state)
       * Alternatives to this form reset approach:
       * 1. Could change the FastForm component's key on submission via a parent component that is notified of submission via a callback.
       * 2. Could extract all the JSX below to a separate component so it could be assigned a key.
       * 3. Could redirect to a confirmation page, then allow the user to click a link to be directed back to a new, empty form (the previous form would have been garbage collected when the user nagivated away, and thus, reset).
       * 4. Add `formSubmitCount` to FastForm's state, increment it upon successful completion, and use that value to set a key on each field. Changing the key tells React to garbage collect, and thus reset.
       */
    }
  }

  return formStatus === "Completed" ? (
    <p>
      Thanks! The submitted values were written to the console.{" "}
      <button onClick={() => setFormStatus("Idle")}>Submit another</button>
    </p>
  ) : (
    <form onSubmit={handleSubmit}>
      {slowComponent}
      <FastInput
        id="firstName"
        label="First Name"
        validate={validate}
        formStatus={formStatus}
        name="firstName"
      />

      <FastInput
        id="email"
        label="Email"
        validate={validate}
        formStatus={formStatus}
        name="email"
      />

      <input type="submit" value="Submit" />
    </form>
  );
}
