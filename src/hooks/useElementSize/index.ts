import { useEffect, useState } from "react";
import type { UseElementSizeProps } from "./types";

function useElementSize<T extends HTMLElement>({
  ref,
}: UseElementSizeProps<T>) {
  const [elementSizeState, setElementSizeState] = useState<DOMRect>(
    new DOMRect(0, 0, 0, 0),
  );

  useEffect(() => {
    if (ref.current) {
      setElementSizeState(
        new DOMRect(
          ref.current.offsetLeft,
          ref.current.offsetTop,
          ref.current.offsetWidth,
          ref.current.offsetHeight,
        ),
      );
    }
  }, [ref]);

  return elementSizeState;
}

export default useElementSize;
