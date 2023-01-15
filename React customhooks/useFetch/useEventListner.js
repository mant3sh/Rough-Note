import { useEffect, useRef } from "react";

export default function useEventListner(event, callBack, element = window) {
  const ref = useRef(callBack);
  useEffect(() => {
    ref.current = callBack;
  }, [callBack]);

  useEffect(() => {
    const handeler = (e) => ref.current(e);
    element.addEventListener(event, handeler);
    return () => element.removeEventListener(event, handeler);
  }, [event, element]);
}
