import type { ComponentEvent } from "types/component-event";

interface OptionProps {
  onClick: () => void;
  isActive?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
  key: string;
  ref?: (el: HTMLElement) => void;
}

interface SelectedOption {
  onRemove: () => void;
}

interface AutocompleteProps<
  Data extends object,
  K extends keyof Data = keyof Data,
> {
  data: Data[];
  value?: Data | null;
  label: string;
  name?: string;
  error?: string;
  prefix?: React.ReactNode;
  groupBy?: (data: Data) => Data[K];
  renderGroup?: (group: string, children: React.ReactNode) => React.JSX.Element;
  renderOption: (data: Data, options: OptionProps) => React.JSX.Element;
  renderSelectedOption: (
    data: Data,
    options: SelectedOption,
  ) => React.JSX.Element;
  onChange?: (event: ComponentEvent<Data | null | undefined>) => void;
}

export type { AutocompleteProps, OptionProps };
