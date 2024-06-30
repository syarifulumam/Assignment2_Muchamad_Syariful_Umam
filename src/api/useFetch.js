import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData() {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setLoading(false);
      setData(response.data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    getData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
