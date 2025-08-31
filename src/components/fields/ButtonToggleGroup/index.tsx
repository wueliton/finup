import ButtonToggleContext from "./hooks/buttonToggleContext";
import useButtonToggleGroup from "./hooks/useButtonToggleGroup";
import type { ButtonToggleGroupProps } from "./types";

function ButtonToggleGroup<isMultiple extends boolean = false>({
  isMultiple,
  ariaLabel,
  children,
  disabled,
  value,
  onChange,
}: ButtonToggleGroupProps<isMultiple>) {
  const { context } = useButtonToggleGroup({
    isMultiple,
    disabled,
    value,
    onChange,
  });

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className="p-xxs gap-xxs flex w-full rounded-sm bg-gray-200"
    >
      <ButtonToggleContext.Provider value={context}>
        {children}
      </ButtonToggleContext.Provider>
    </div>
  );
}

export default ButtonToggleGroup;
