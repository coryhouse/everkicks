import { ChangeEventHandler } from "react";

type TextInputProps = {
  value: string;
  error?: string;
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "date" | "number" | "phone" | "password";
};

export default function TextInput({
  value,
  label,
  error,
  onChange,
  id,
  type = "text",
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input type={type} id={id} value={value} onChange={onChange} />
      {error && <div>{error}</div>}
    </div>
  );
}
