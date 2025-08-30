import { MediaQueryEnum } from "./constants";

type UseMediaQueryProps = {
  [k in MediaQueryEnum]?: number;
};

export type { UseMediaQueryProps };
