import type { IconNames } from "components/Icon/types";
import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "tailwind-variants";
import type { buttonIconStyles } from "./styles";

type ButtonIconVariants = VariantProps<typeof buttonIconStyles>;

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonIconVariants["variant"];
  icon: IconNames;
}

export type { ButtonIconProps };
