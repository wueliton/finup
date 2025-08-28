import type { ReactNode } from "react";
import type { OptionProps } from "../../types";

interface AutocompleteOptionProps extends Omit<OptionProps, "ref" | "key"> {
  children: ReactNode;
  className?: string;
}

export type { AutocompleteOptionProps };
