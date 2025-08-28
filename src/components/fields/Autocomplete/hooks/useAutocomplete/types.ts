import type { ComponentEvent } from "types/component-event";

interface UseAutocompleteProps<
  Data extends object,
  K extends keyof Data = keyof Data,
> {
  data: Data[];
  value?: Data | null;
  onChange?: (event: ComponentEvent<Data | null | undefined>) => void;
  groupBy?: (data: Data) => Data[K];
}

export type { UseAutocompleteProps };
