import { forwardRef, memo } from "react";
import { buttonStyles } from "./styles";
import type { ButtonProps } from "./types";

function Button(
  { variant, size, ...buttonProps }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { container } = buttonStyles({
    variant,
    size,
  });

  return (
    <button
      {...buttonProps}
      className={container({ className: buttonProps.className })}
      ref={ref}
    />
  );
}

export default memo(forwardRef(Button));
