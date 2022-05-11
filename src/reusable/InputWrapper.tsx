type InputWrapperProps = {
  children: React.ReactNode;
  /** Input HTML id */
  id: string;

  /** Input label */
  label: string;

  /** Input validation error */
  error?: string;
};

export default function InputWrapper({
  id,
  label,
  error,
  children,
}: InputWrapperProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      {children}
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
