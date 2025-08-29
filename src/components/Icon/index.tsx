import type { Icon } from "@solar-icons/react/lib/types";
import { lazy, memo, Suspense, type FC } from "react";
import type { IconProps } from "./types";

function Icon({ name, size = 24, className, weight }: IconProps) {
  const DynamicIcon = lazy(() =>
    import(`@solar-icons/react/ssr`).then((item) => ({
      default: item[name] as Icon,
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

  return (
    <Suspense
      fallback={
        <div
          style={{ height: `${size}px`, width: `${size}px` }}
          className="rounded-xxs bg-gray-200"
        />
      }
    >
      {invalidIcon ? null : (
        <DynamicIcon size={size} className={className} weight={weight} />
      )}
    </Suspense>
  );
}

export default memo(Icon);
