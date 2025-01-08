import { useEffect, useState } from "react";

export const FetchData = async (fetchFunction, param = null) => {
  const result = await fetchFunction(param);
  return await result.json();
};

export const useFetchData = (fetchFunction, param = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) return; // Skip fetch if data already exists
    fetchData();
  }, [data]); // Trigger only if `data` is null

  const fetchData = async () => {
    try {
      const result = await fetchFunction(param);
      setData(await result.json());
    } catch (error) {
      setError(error.message);
    }
  };

  return { data, error };
};
