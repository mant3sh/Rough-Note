import { useEffect, useState } from "react";
import useEventListner from "./useEventListner";

export default function useMediaQuery(query) {
  const [isMatch, setIsMatch] = useState();
  const [list, setList] = useState();
  useEffect(() => {
    const l = window.matchMedia(query);
    setList(l);
    isMatch(list.matches);
  }, [query]);
  useEventListner("resize", (e) => setIsMatch(e.matches), list);
  return isMatch;
}
