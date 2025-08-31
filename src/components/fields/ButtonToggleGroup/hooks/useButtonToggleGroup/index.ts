import { useCallback, useMemo } from "react";
import type { ComponentEvent } from "types/component-event";
import type { UseButtonToggleGroup } from "./types";

function useButtonToggleGroup<isMultiple extends boolean>({
  value,
  isMultiple,
  disabled,
  onChange,
}: UseButtonToggleGroup<isMultiple>) {
  const handleOnChange = useCallback(
    (event: ComponentEvent<string>) => {
      const eventValue = event.target.value;
      const newValue = isMultiple
        ? [eventValue, ...(value as string[])]
        : eventValue;
      onChange?.({
        target: {
          value: newValue as isMultiple extends true ? string[] : string,
        },
      });
    },
    [onChange, isMultiple, value],
  );

  const context = useMemo(
    () => ({
      value,
      isMultiple,
      disabled,
      onChange: handleOnChange,
    }),
    [value, isMultiple, disabled, handleOnChange],
  );

  return {
    context,
  };
}

export default useButtonToggleGroup;
