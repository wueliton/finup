import type { FieldErrorProps } from "./types";

function FieldError({ children, id }: FieldErrorProps) {
  return (
    <span id={id} className="px-sm text-xs text-red-600">
      {children}
    </span>
  );
}

export default FieldError;
