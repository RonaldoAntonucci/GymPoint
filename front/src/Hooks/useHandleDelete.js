import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Confirm from '~/components/Confirm';

function useHandleDelete(message) {
  function dell(id) {
    console.log(id);
  }
  const confirmation = data => {
    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <Confirm
          callback={() => dell(data.id)}
          onClose={onClose}
          title="Deseja excluir este aluno?"
          message={`${message}`}
        />
      ),
    });
  };

  return confirmation;
}

export default useHandleDelete;
