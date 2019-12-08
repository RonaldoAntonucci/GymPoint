import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StyledTable, Actions, ActionButton } from './styles';
import Pagination from './Pagination';

export default function Table({ pagination, columns, action, ...rest }) {
  const act = useMemo(() => {
    return action
      ? {
          render: data => (
            <Actions>
              {action.map(a =>
                a.link ? (
                  <Link key={a.text} to={`${a.link}/${data.id}`}>
                    <ActionButton
                      color={a.color}
                      type="button"
                      onClick={() => a.onClick(data.id)}
                    >
                      {a.text}
                    </ActionButton>
                  </Link>
                ) : (
                  <ActionButton
                    key={a.text}
                    color={a.color}
                    type="button"
                    onClick={() => a.onClick(data.id)}
                  >
                    {a.text}
                  </ActionButton>
                )
              )}
            </Actions>
          ),
        }
      : null;
  }, [action]);

  useMemo(() => {
    if (act) columns.push(act);
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
