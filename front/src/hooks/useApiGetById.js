import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export default function(api, url, setState) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(
    id => {
      async function getApi() {
        try {
          setLoading(true);
          setState(null);
          const response = await api.get(`${url}/${id}`);
          setState(response.data);
        } catch (err) {
          setError(err);
          toast.error(`Não foi possível carregar ${url}.`);
        } finally {
          setLoading(false);
        }
      }
      getApi();
    },
    [api, setState, url]
  );

  return [getData, loading, error];
}
