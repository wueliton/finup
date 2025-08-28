import type { IconNames } from "components/Icon/types";
import type { To } from "react-router";

interface MenuButtonProps {
  icon: IconNames;
  title: string;
  to: To;
}

export type { MenuButtonProps };
