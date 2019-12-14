import React, { useState, useEffect } from 'react';

function useApiGetRequest({ api, url, options }) {
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await api.get(url, options);
      setData(response.data);
      setTotalPages(response.headers.total_pages);
    }

    getData();
  });

  return [data, totalPages];
}

export default useApiGetRequest;
