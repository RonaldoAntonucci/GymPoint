import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { MdCheckCircle } from 'react-icons/md';

import Loading from '~/components/Loading';

import {
  Container,
  Table,
  ActionButton,
  TableFooter,
  TableFooterButton,
  TableContainer,
} from './styles';

function StyledTable({ data, columns, actions, pagination }) {
  const [columnTitles, setColumnTitles] = useState([]);

  const page = useMemo(() => pagination.page, [pagination.page]);

  useEffect(() => {
    const cTitles = [];
    columns.forEach(c => {
      cTitles.push(c.title);
    });

    setColumnTitles(cTitles);
  }, [columns, pagination.totalPages]);

  const handleInputPage = useCallback(
    event => {
      event.preventDefault();
      pagination.onPageChange(event.target.p.value);
    },
    [pagination]
  );

  return !data ? (
    <Container>
      <Loading />
    </Container>
  ) : (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              {columnTitles.map((title, index) => (
                <th {...columns[index].styles} key={title}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(tr => (
              <tr key={tr.id}>
                <>
                  {columns.map(td => (
                    <td key={td.field} {...td.styles}>
                      {td.type === 'boolean' ? (
                        <MdCheckCircle
                          size="20px"
                          color={tr[td.field] ? 'green' : '#ddd'}
                        />
                      ) : (
                        tr[td.field]
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td>
                      {actions.map(a => (
                        <ActionButton
                          key={a.name}
                          color={a.color}
                          onClick={() => a.onClick(tr)}
                        >
                          {a.name}
                        </ActionButton>
                      ))}
                    </td>
                  )}
                </>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <TableFooter>
        <TableFooterButton
          disabled={page === 1}
          onClick={() => page !== 1 && pagination.onPageChange(1)}
        >
          Primeira
        </TableFooterButton>
        <TableFooterButton
          disabled={page === 1}
          onClick={() => page > 1 && pagination.onPageChange(page - 1)}
        >
          Anterior
        </TableFooterButton>
        <form onSubmit={handleInputPage}>
          <input
            name="p"
            type="number"
            value={page}
            min={1}
            max={pagination.totalPages}
            onChange={() => {}}
          />
        </form>
        <TableFooterButton
          disabled={page >= pagination.totalPages}
          onClick={() =>
            page < pagination.totalPages && pagination.onPageChange(page + 1)
          }
        >
          Proxima
        </TableFooterButton>
        <TableFooterButton
          disabled={page >= pagination.totalPages}
          onClick={() =>
            pagination.totalPages &&
            pagination.onPageChange(pagination.totalPages)
          }
        >
          Última
        </TableFooterButton>
      </TableFooter>
    </Container>
  );
}

StyledTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.shape({
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onPageChange: PropTypes.func,
  }),
};

StyledTable.defaultProps = {
  actions: null,
  pagination: null,
  data: null,
};

export default StyledTable;
