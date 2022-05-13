import { useState } from "react";
import FastInput from "./FastInput";

type FormStatus = "Idle" | "Submitted";

export default function FastForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("Idle");

  function required(value: string) {
    return !value ? "This is required." : "";
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setFormStatus("Submitted");
      }}
    >
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
