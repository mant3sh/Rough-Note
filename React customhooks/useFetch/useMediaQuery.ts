import { useState, useEffect, createContext } from "react";
import Debounce from "../utils/debounce";
type Props = {
  children: any;
};
export type MediaQueryObject = {
  width: number;
  height: number;
};
export const MediaQueryContext = createContext<MediaQueryObject>({
  width: window.innerWidth,
  height: window.innerHeight,
});
export default function ({ children }: Props) {
  const [mediaQuery, setMediaQuery] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const myDebounce = Debounce(() => {
      const updatedQuery = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setMediaQuery(updatedQuery);
    }, 400);

    window.addEventListener("resize", myDebounce);

    return () => {
      window.removeEventListener("resize", myDebounce);
    };
  }, []);

  return (
    <MediaQueryContext.Provider value={mediaQuery}>
      {children}
    </MediaQueryContext.Provider>
  );
}
