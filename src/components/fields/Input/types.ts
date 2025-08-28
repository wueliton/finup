import type { MaskOptions } from "hooks/useMask/types";
import type { InputHTMLAttributes } from "react";
import type { ComponentEvent } from "types/component-event";

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "suffix" | "prefix" | "onChange"
  > {
  prefix?: React.ReactNode;
  textPrefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label: string;
  hint?: string;
  mask?: MaskOptions;
  hideInput?: boolean;
  error?: string;
  onChange?: (event: ComponentEvent) => void;
}

export type { InputProps };
