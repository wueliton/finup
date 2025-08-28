import { useState, type ChangeEvent } from "react";
import Masks from "./masks";
import type { MaskOptions } from "./types";

function useMask(mask?: MaskOptions) {
  const [valueState, setValueState] = useState("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const emptyMask = !mask;

    if (!value) {
      setValueState("");
      return;
    }

    if (emptyMask) {
      setValueState(e.target.value);
      return;
    }

    const formatted = Masks[mask](value);

    e.target.value = String(formatted);
    setValueState(String(formatted));
  }

  return {
    value: valueState,
    onChange,
  };
}

export default useMask;
