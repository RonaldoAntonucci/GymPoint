import { useCallback } from 'react';
import history from '~/services/history';

function useHandleEdit(url) {
  const handleEdit = useCallback(
    data => {
      history.push({
        pathname: `${url}/${data.id}`,
        state: { data },
      });
    },
    [url]
  );

  return handleEdit;
}

export default useHandleEdit;
