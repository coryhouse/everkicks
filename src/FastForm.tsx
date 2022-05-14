import { useState } from "react";
import FastInput from "./FastInput";

export type FormStatus = "Idle" | "Submitted";
export type FieldName = "firstName" | "email";
export type ValidateFunction = (name: FieldName, value: string) => string;

type FastFormProps = {
  slowComponent: React.ReactNode;
};

/**
 * The FastForm component takes the uncontrolled approach. Rather than keeping
 * track of all the values and passing the values to each field, we let the
 * fields keep track of things themselves and we retrieve the values from the
 * form.elements when it's submitted.
 */
export default function FastForm({ slowComponent }: FastFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("Idle");
  const [submitCount, setSubmitCount] = useState(0);

  function validateRequired(value: string) {
    return value ? "" : "Required field.";
  }

  function validateEmail(value: string) {
    return value.includes("@") ? "" : "Invalid email.";
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
    setSubmitCount((curValue) => curValue + 1);

    // Since the fields all manage their own state, read form data from form's event
    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(formData.entries());

    const formIsValid = Object.entries(fields).every(([fieldName, value]) => {
      return !validate(fieldName as FieldName, value.toString());
    });

    if (formIsValid) {
      event.currentTarget.reset();
      console.log(`Fast Form Submitted`, fields);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      {submitCount}
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
