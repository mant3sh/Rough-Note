// useupdateeffct is a custom hook which is like useEffcet but it dosent run on first render it runs only on updates

import { useEffect, useRef } from "react";

export default function useUpdateEffect(callback, dependencies) {
  const update = useRef(true);

  useEffect(() => {
    if (update.current) {
      update.current = false;
      return;
    }
    return callback;
  }, dependencies);
}
