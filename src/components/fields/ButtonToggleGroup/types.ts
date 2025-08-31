import type { ComponentEvent } from "types/component-event";

interface ButtonToggleGroupProps<
  isMultiple extends boolean,
  Value = isMultiple extends true ? string[] : string,
> {
  ariaLabel: string;
  isMultiple?: isMultiple;
  disabled?: boolean;
  children: React.ReactNode;
  value?: Value | null;
  onChange?: (event: ComponentEvent<Value>) => void;
}

export type { ButtonToggleGroupProps };
