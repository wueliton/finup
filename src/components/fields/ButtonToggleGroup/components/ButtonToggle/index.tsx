import Button from "components/Button";
import useButtonToggle from "./hooks/useButtonToggle";
import type { ButtonToggleProps } from "./types";

function ButtonToggle({ value, children }: ButtonToggleProps) {
  const { buttonRef, buttonProps, handleOnClick } = useButtonToggle({
    buttonValue: value,
  });

  return (
    <Button
      {...buttonProps}
      ref={buttonRef}
      className="flex-1"
      type="button"
      size="sm"
      aria-label={value}
      onClick={handleOnClick}
    >
      {children}
    </Button>
  );
}

export default ButtonToggle;
