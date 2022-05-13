import { useState } from "react";

type FastInputProps = {
  name: string;
  wasSubmitted: boolean;
  validate: (value: string) => string;
};

export default function FastInput({
  name,
  wasSubmitted,
  validate,
}: FastInputProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  // Derived state
  // Note: This is fast, because it will only run when we're interacting
  // with this specific field.
  const error = validate(value);

  return (
    <div>
      <input
        type="text"
        name={name}
        value={value}
        onBlur={() => setTouched(true)}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && (touched || wasSubmitted) && <p role="alert">{error}</p>}
    </div>
  );
}
