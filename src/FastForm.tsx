import { useState } from "react";
import FastInput from "./FastInput";

type FormStatus = "Idle" | "Submitted";

type FastFormProps = {
  slowComponent: React.ReactNode;
};

export default function FastForm({ slowComponent }: FastFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("Idle");
  const [submitCount, setSubmitCount] = useState(0);
  function required(value: string) {
    return !value ? "This is required." : "";
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setFormStatus("Submitted");
        setSubmitCount((curValue) => curValue + 1);
      }}
    >
      {submitCount}
      {slowComponent}
      <FastInput
        validate={required}
        wasSubmitted={formStatus === "Submitted"}
        name="one"
      />

      <FastInput
        validate={required}
        wasSubmitted={formStatus === "Submitted"}
        name="two"
      />

      <input type="submit" value="Submit" />
    </form>
  );
}
