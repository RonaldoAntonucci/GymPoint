import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function(api, url, options) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(url, {
          ...options,
          params: { quantity: 20, ...options.params },
        });
        setData(response.data);
        setTotalPages(response.headers.total_pages);
      } catch (err) {
        setError(err);
        toast.error(`Não foi possível carregar ${url}.`);
      }
    }

    getData();
    // eslint-disable-next-line
  }, [options.params.page, options.params.q]);

  return [data, totalPages, error];
}
