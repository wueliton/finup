import type { InputProps } from "../Input/types";

type OnChangeEvent = {
  target: {
    value?: null | Date;
  };
};

interface DatepickerPops
  extends Omit<InputProps, "prefix" | "mask" | "maxLength" | "onChange"> {
  onChange?: (event: OnChangeEvent) => void;
}

export type { DatepickerPops };
