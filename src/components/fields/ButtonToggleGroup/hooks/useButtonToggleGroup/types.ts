import type { ButtonToggleGroupProps } from "../../types";

type UseButtonToggleGroup<isMultiple extends boolean> = Omit<
  ButtonToggleGroupProps<isMultiple>,
  "ariaLabel" | "children"
>;

export type { UseButtonToggleGroup };
