import Icon from "components/Icon";
import type { FieldErrorProps } from "./types";

function FieldError({ children, id }: FieldErrorProps) {
  return (
    <span id={id} className="gap-xxs flex items-center text-xs text-red-600">
      <Icon name="DangerTriangle" className="text-red-600" size={14} />
      {children}
    </span>
  );
}

export default FieldError;
