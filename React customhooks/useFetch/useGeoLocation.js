import { useEffect, useState } from "react";

export default function useGeoLocation(options) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setdata] = useState();

  useEffect(() => {
    const Success = (e) => {
      setLoading(false);
      setError(null);
      setdata(e.c0ords);
    };
    const errorHandeler = () => {
      setError(e);
      setLoading(false);
    };
    navigator.geolocation.getCurrentPosition(Success, errorHandeler, options);

    const id = navigator.geolocation.watchPosition(
      Success,
      errorHandeler,
      options
    );
    return () => navigator.geolocation.clearWatch(id);
  }, [options]);
  return [loading, error, data];
}
