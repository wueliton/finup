import type { ComponentEvent } from "types/component-event";
import type { InputProps } from "../Input/types";

interface DatepickerPops
  extends Omit<InputProps, "prefix" | "mask" | "maxLength" | "onChange"> {
  onChange?: (event: ComponentEvent<null | Date>) => void;
}

export type { DatepickerPops };
