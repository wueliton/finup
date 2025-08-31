import { memo } from "react";
import { buttonStyles } from "./styles";
import type { ButtonProps } from "./types";

function Button({ variant, size, ...buttonProps }: ButtonProps) {
  const { container } = buttonStyles({
    variant,
    size,
  });

  return (
    <button
      {...buttonProps}
      className={container({ className: buttonProps.className })}
    />
  );
}

export default memo(Button);
