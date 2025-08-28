import Icon from "components/Icon";
import { chipStyles } from "./styles";
import type { ChipProps } from "./types";

function Chip({
  variant,
  size,
  children,
  className,
  canRemove,
  onRemove,
}: ChipProps) {
  const { container } = chipStyles({ variant, size });

  function handleOnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();
    onRemove?.();
  }

  return (
    <div className={container({ className })}>
      {children}
      {canRemove ? (
        <button
          aria-label="Remover item"
          className="cursor-pointer"
          onClick={handleOnClick}
        >
          <Icon
            size={16}
            name="CloseCircle"
            weight="Bold"
            className="text-current opacity-65"
          />
        </button>
      ) : null}
    </div>
  );
}

export default Chip;
