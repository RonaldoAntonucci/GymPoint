import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { StyledTable, Actions, ActionButton } from './styles';
import Pagination from './Pagination';

export default function Table({ pagination, columns, action, ...rest }) {
  const act = useMemo(() => {
    return {
      render: data => (
        <Actions>
          {action.map(a => (
            <ActionButton
              key={a.text}
              color={a.color}
              type="button"
              onClick={() => a.onClick(data.id)}
            >
              {a.text}
            </ActionButton>
          ))}
        </Actions>
      ),
    };
  }, [action]);

  useMemo(() => {
    columns.push(act);
  }, [act, columns]);

  return (
    <StyledTable
      columns={columns}
      {...rest}
      components={{
        Pagination: () => Pagination(pagination),
      }}
    />
  );
}

Table.propTypes = {
  pagination: PropTypes.shape(),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  pagination: {},
  action: [],
};
