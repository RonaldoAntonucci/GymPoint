import React from 'react';
import PropTypes from 'prop-types';

import { StyledTable } from './styles';
import Pagination from './Pagination';

export default function Table({ pagination, ...rest }) {
  return (
    <StyledTable
      {...rest}
      components={{
        Pagination: () => Pagination(pagination),
      }}
    />
  );
}

Table.propTypes = {
  pagination: PropTypes.shape(),
};

Table.defaultProps = {
  pagination: {},
};
