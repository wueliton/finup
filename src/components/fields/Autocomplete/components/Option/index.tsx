import { forwardRef } from "react";
import { autocompleteOptionsStyle } from "./styles";
import type { AutocompleteOptionProps } from "./types";

function AutocompleteOption(
  {
    children,
    isActive,
    className,
    isSelected,
    isFocused,
    onClick,
  }: AutocompleteOptionProps,
  ref: React.Ref<HTMLElement>,
) {
  function handleOnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();
    onClick?.();
  }

  return (
    <button
      className={autocompleteOptionsStyle({
        isActive,
        isFocused,
        isSelected,
        className,
      })}
      onClick={handleOnClick}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}

export default forwardRef(AutocompleteOption);
