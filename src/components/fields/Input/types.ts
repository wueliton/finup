import type { MaskOptions } from "hooks/useMask/types";
import type { InputHTMLAttributes } from "react";
import type { ComponentEvent } from "types/component-event";

interface InputProps<Value>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "suffix" | "prefix" | "onChange" | "value"
  > {
  prefix?: React.ReactNode;
  textPrefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label: string;
  hint?: string;
  mask?: MaskOptions;
  hideInput?: boolean;
  value?: Value;
  error?: string;
  onChange?: (event: ComponentEvent<Value>) => void;
}

export type { InputProps };
