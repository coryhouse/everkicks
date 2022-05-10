import { ChangeEventHandler, FocusEventHandler } from "react";

interface Option {
  /** Value for option */
  value: string;
  /** Optional label (defaults to value if label is not provided) */
  label?: string;
}

interface SelectInputProps {
  /** Select input value */
  value: string;

  /** Select input options */
  options: Option[];

  /** Select input validation error */
  error?: string;

  /** Select input onChange handler */
  onChange: ChangeEventHandler<HTMLSelectElement>;

  /** Text input's onBlur handler */
  onBlur?: FocusEventHandler<HTMLSelectElement>;

  /** Select input label */
  label: string;

  /** Select input HTML id */
  id: string;
}

export default function SelectInput({
  value,
  options,
  error,
  onChange,
  onBlur,
  label,
  id,
}: SelectInputProps) {
  const inputProps: any = {
    id,
    value,
    label,
    onChange,
    onBlur,
  };

  if (error) {
    inputProps["aria-invalid"] = true;
    inputProps["aria-describedby"] = id + "-error";
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <select {...inputProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
      <p id={id + "-error"} role="alert">
        {error}
      </p>
    </div>
  );
}
