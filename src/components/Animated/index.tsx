import { forwardRef, memo, useState } from "react";
import { animatedStyles } from "./styles";
import type { AnimatedProps } from "./types";

function Animated(
  { children, show, className, animation, onEnd, ...divProps }: AnimatedProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [unmountedState, setUnmountedState] = useState(true);

  function handleAnimationEnd() {
    if (unmountedState || show) return;

    setUnmountedState(true);
    onEnd?.();
  }

  if (show && unmountedState) setUnmountedState(false);

  if (unmountedState) return null;

  return (
    <div
      {...divProps}
      onAnimationEnd={handleAnimationEnd}
      className={animatedStyles({
        className,
        animation,
        isMounted: show,
      })}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default memo(forwardRef(Animated));
