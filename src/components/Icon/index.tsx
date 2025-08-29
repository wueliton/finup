import { lazy, memo, type FC } from "react";
import type { IconProps } from "./types";

function Icon({ name, size = 24, className, weight }: IconProps) {
  const DynamicIcon = lazy(() =>
    import(`@solar-icons/react/${name}`).then((mod) => ({
      default: mod[name],
    })),
  ) as FC<{
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
  const invalidIcon = !DynamicIcon;

  if (invalidIcon) return null;
  return <DynamicIcon size={size} className={className} weight={weight} />;
}

export default memo(Icon);
