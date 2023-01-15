import { useState } from "react";

export default function useOnScreen(ref, margin) {
  const [isVisible, setIsVisible] = useState();
  useEffect(() => {
    if (ref.current == null) return;
    const observer = new IntersectionObserver(([entery]) => {
      setIsVisible(entery.isIntersecting), { margin };
    });

    observer.current(ref.current);

    return () => {
      if (ref.current == null) return;
      observer.unobserve(ref.curr);
    };
  }, [ref, margin]);
  return isVisible;
}
