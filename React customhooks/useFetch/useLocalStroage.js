import { useEffect, useState } from "react";

function getStoredValue(key, inititalValue) {
  const storevalue = JSON.parse(localStorage.getItem(key));
  if (storevalue) return storevalue;

  if (inititalValue instanceof Function) return inititalValue();

  return inititalValue;
}

export default function useLocalStorage(key, inititalValue) {
  const [state, setState] = useState(() => {
    return getStoredValue(key, inititalValue);
  });
  useEffect(() => {
    localStorage.setItem(key, state);
  }, [state]);
  return [state, setState];
}
