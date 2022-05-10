import { ChangeEventHandler } from "react";

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
  label,
  id,
}: SelectInputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <select id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>

      {error && <div>{error}</div>}
    </div>
  );
}
