import type { ComponentEvent } from "types/component-event";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ButtonToggleContextProps {
  onChange?: (value: ComponentEvent<any>) => void;
  value?: any;
  disabled?: boolean;
  isMultiple?: boolean;
}

export type { ButtonToggleContextProps };
