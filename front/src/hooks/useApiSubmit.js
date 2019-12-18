import { useCallback, useState } from 'react';

export default function({
  api = { post: () => {}, put: () => {} },
  url = '/',
  success = () => {},
  failed = () => {},
  setResponse = () => {},
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        const method = data.id ? api.put : api.post;
        const complement = data.id ? `/${data.id}` : '';
        const response = await method(`${url}${complement}`, data);

        setResponse(response.data);
        if (typeof success === 'function') success();
      } catch (err) {
        if (typeof failed === 'function') failed();
      } finally {
        setLoading(false);
      }
    },
    [api.post, api.put, failed, setResponse, success, url]
  );

  return [handleSubmit, loading];
}
