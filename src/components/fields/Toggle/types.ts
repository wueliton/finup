import type { ComponentEvent } from "types/component-event";

interface ToggleProps<Value extends string> {
  children: React.ReactNode;
  value?: Value;
  disabled?: boolean;
  name: string;
  onChange?: (event: ComponentEvent<Value>) => void;
}

export type { ToggleProps };
