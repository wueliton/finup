import type { VariantProps } from "tailwind-variants";
import type { chipStyles } from "./styles";

type ChipVariants = VariantProps<typeof chipStyles>;

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariants["variant"];
  size?: ChipVariants["size"];
  className?: string;
  canRemove?: boolean;
  onRemove?: () => void;
}

export type { ChipProps };
