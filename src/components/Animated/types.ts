import type { VariantProps } from "tailwind-variants";
import type { animatedStyles } from "./styles";

type AnimatedVariants = VariantProps<typeof animatedStyles>;

interface AnimatedProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  animation: AnimatedVariants["animation"];
  className?: string;
  onEnd?: () => void;
  show?: boolean;
}

export type { AnimatedProps, AnimatedVariants };
