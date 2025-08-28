import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import Masks from "./masks";
import type { InputModeOptions, MaskOptions } from "./types";

function useMask(
  mask?: MaskOptions,
  value?: string | number | readonly string[],
) {
  const [valueState, setValueState] = useState(value ?? "");
  const isNumber = mask === "currency";
  const inputMode: InputModeOptions = isNumber ? "numeric" : "text";

  const changeValue = useCallback(
    (value?: string | number | readonly string[]) => {
      const emptyMask = !mask;

      if (!value) {
        setValueState("");
        return;
      }

      if (emptyMask) {
        setValueState(value);
        return;
      }

      const formatted = Masks[mask](String(value));

      setValueState(String(formatted));
    },
    [mask],
  );

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    changeValue(value);
  }

  useEffect(() => {
    changeValue(value);
  }, [value, changeValue]);

  return {
    value: valueState,
    isNumber,
    inputMode,
    onChange,
  };
}

export default useMask;
