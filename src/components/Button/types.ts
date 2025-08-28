import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "tailwind-variants";
import type { buttonStyles } from "./styles";

type ButtonVariants = VariantProps<typeof buttonStyles>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants["variant"];
}

export type { ButtonProps };
