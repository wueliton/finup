import type { ButtonProps } from "components/Button/types";
import ButtonToggleContext from "components/fields/ButtonToggleGroup/hooks/buttonToggleContext";
import { useContext, useMemo, useRef } from "react";
import type { UseButtonToggleProps } from "./types";

function useButtonToggle({ buttonValue }: UseButtonToggleProps) {
  const { isMultiple, value, disabled, onChange } =
    useContext(ButtonToggleContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonProps = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actualValue = isMultiple ? ((value ?? []) as any[]) : [value];
    const isSelected = actualValue.includes(buttonValue);
    const variant: ButtonProps["variant"] = isSelected ? "secondary" : "ghost";
    const role = isMultiple ? "presentation" : "radio";
    const isFirstChild =
      buttonRef.current?.parentElement?.firstElementChild === buttonRef.current;
    const tabIndex =
      (!isMultiple && !isSelected && value) ||
      (!isMultiple && !value && !isFirstChild)
        ? -1
        : 0;

    return {
      variant,
      role,
      disabled,
      tabIndex,
      ...(isMultiple ? {} : { "aria-checked": isSelected }),
    };
  }, [value, isMultiple, buttonValue, disabled]);

  function handleOnClick() {
    onChange?.({
      target: {
        value: buttonValue,
      },
    });
  }

  return {
    buttonRef,
    buttonProps,
    handleOnClick,
  };
}

export default useButtonToggle;
