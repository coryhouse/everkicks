import { ChangeEventHandler, FocusEventHandler } from "react";

type TextInputProps = {
  /** Text input value */
  value: string | number;

  /** Validation error */
  error?: string;

  /** Text input label */
  label: string;

  /** Optionally specify the step for an input with a type of number */
  step?: string;

  /** Text input's **HTML** ID
   * List of items
   * - one
   * - two
   *
   * [See docs here](http://google.com)
   */
  id: string;

  /** Text input's onChange handler */
  onChange: ChangeEventHandler<HTMLInputElement>;

  /** Text input's onBlur handler */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /** Text input's type */
  type?: "text" | "date" | "number" | "phone" | "password";
};

export default function TextInput({
  value,
  label,
  error,
  onChange,
  onBlur,
  id,
  type = "text",
  step,
}: TextInputProps) {
  // Dynamically building props so that we only apply the step property when relevant.
  const inputProps: any = {
    type,
    id,
    value,
    onChange,
    onBlur,
  };

  if (type === "number") {
    inputProps.step = step;
  }

  if (error) {
    inputProps["aria-invalid"] = true;
    inputProps["aria-describedby"] = id + "-error";
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input {...inputProps} />
      <p
        id={id + "-error"}
        aria-label={error}
        role={error ? "alert" : undefined}
      >
        {error}
      </p>
    </div>
  );
}
