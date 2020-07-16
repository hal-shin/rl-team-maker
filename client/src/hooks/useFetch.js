import { useCallback, useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url, options);
      const data = await res.json();

      if (res.status >= 200 && res.status < 300) {
        setResponse(data);
      } else {
        setError(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [options, url]);

  useEffect(() => {
    fetchData();
  }, []);
  return { response, isLoading, error };
};

export default useFetch;
