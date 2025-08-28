import type { IconNames } from "components/Icon/types";
import type { To } from "react-router";

interface StatementLineProps {
  to: To;
  icon: IconNames;
  title: string;
  category: string;
  updatedAt: string;
  amount: number;
}

export type { StatementLineProps };
