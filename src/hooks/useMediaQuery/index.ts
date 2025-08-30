import { useEffect, useMemo, useState } from "react";
import { MediaQueryEnum, mediaToQuery } from "./constants";
import type { UseMediaQueryProps } from "./types";

function useMediaQuery(query: UseMediaQueryProps) {
  const [matches, setMatches] = useState(false);
  const queryToMq = useMemo(
    () =>
      `(${Object.entries(query)
        .map(
          ([mq, value]) => `${mediaToQuery[mq as MediaQueryEnum]}: ${value}px`,
        )
        .join(" and ")})`,
    [query],
  );

  useEffect(() => {
    const media = window.matchMedia(queryToMq);
    const listener = () => setMatches(media.matches);

    setMatches(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [queryToMq]);

  return matches;
}

export default useMediaQuery;
