import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Container, Pag, StyledForm, StyledInput } from './styles';

export default function Pagination({ page, handlePage, lastPage }) {
  const handleNextPage = useCallback(() => {
    handlePage('next');
  }, [handlePage]);

  const handlePreviousPage = useCallback(() => {
    handlePage('previous');
  }, [handlePage]);

  const handleFirstPage = useCallback(() => {
    handlePage('first');
  }, [handlePage]);

  const handleLastPage = useCallback(() => {
    handlePage('last');
  }, [handlePage]);

  const handleInput = useCallback(
    ({ page: p }) => {
      handlePage(p);
    },
    [handlePage]
  );

  return (
    <Container>
      <Pag>
        <button type="button" onClick={handleFirstPage}>
          Primeira
        </button>
        <button type="button" onClick={handlePreviousPage}>
          Anterior
        </button>
        <StyledForm onSubmit={handleInput} initialData={{ page }}>
          <StyledInput type="number" name="page" min={1} max={lastPage} />
        </StyledForm>

        <button type="button" onClick={handleNextPage}>
          Próxima
        </button>
        <button type="button" onClick={handleLastPage}>
          Última
        </button>
      </Pag>
    </Container>
  );
}

Pagination.propTypes = {
  lastPage: PropTypes.number,
  handlePage: PropTypes.func.isRequired,
  page: PropTypes.number,
};

Pagination.defaultProps = {
  lastPage: 1,
  page: 1,
};
