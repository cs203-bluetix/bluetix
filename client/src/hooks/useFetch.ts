import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [url]);

  const refetch = async () => {
    setLoading(true);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error, refetch };
}

export default useFetch;
