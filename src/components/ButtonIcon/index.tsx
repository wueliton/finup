import Icon from "components/Icon";
import { buttonIconStyles } from "./styles";
import type { ButtonIconProps } from "./types";

function ButtonIcon({ variant, icon, ...buttonProps }: ButtonIconProps) {
  const { container } = buttonIconStyles({
    variant,
  });

  return (
    <button
      {...buttonProps}
      className={container({ className: buttonProps.className })}
    >
      <Icon name={icon} />
    </button>
  );
}

export default ButtonIcon;
