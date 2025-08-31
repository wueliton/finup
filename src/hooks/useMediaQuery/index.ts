import { useEffect, useMemo, useRef, useState } from "react";
import { MediaQueryEnum, mediaToQuery } from "./constants";
import type { UseMediaQueryProps } from "./types";

function useMediaQuery(
  query: UseMediaQueryProps,
): [boolean, React.RefObject<boolean>] {
  const [matches, setMatches] = useState(false);
  const matchesRef = useRef(false);
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
    const listener = () => {
      setMatches(media.matches);
      matchesRef.current = media.matches;
    };

    setMatches(media.matches);
    matchesRef.current = media.matches;

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [queryToMq]);

  return [matches, matchesRef];
}

export default useMediaQuery;
