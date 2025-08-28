import type { FieldHintProps } from "./types";

function FieldHint({ children, id }: FieldHintProps) {
  return (
    <span id={id} className="px-sm text-xs text-black/75">
      {children}
    </span>
  );
}

export default FieldHint;
