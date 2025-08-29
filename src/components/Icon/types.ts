import * as SolarIcons from "@solar-icons/react/ssr";

type IconNames = keyof typeof SolarIcons;

interface IconProps {
  name: IconNames;
  size?: number;
  className?: string;
  weight?:
    | "Bold"
    | "Linear"
    | "Outline"
    | "BoldDuotone"
    | "LineDuotone"
    | "Broken";
}

export type { IconNames, IconProps };
