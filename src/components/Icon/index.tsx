import * as SolarIcons from "@solar-icons/react";
import { memo, type FC } from "react";
import type { IconProps } from "./types";

function Icon({ name, size = 24, className, weight }: IconProps) {
  const Icon = SolarIcons[name] as FC<{
    size: number;
    className?: string;
    weight?:
      | "Bold"
      | "Linear"
      | "Outline"
      | "BoldDuotone"
      | "LineDuotone"
      | "Broken";
  }>;
  const invalidIcon = !Icon;

  if (invalidIcon) return null;
  return (
    <Icon
      size={size}
      className={`text-black/40 ${className}`}
      weight={weight}
    />
  );
}

export default memo(Icon);
