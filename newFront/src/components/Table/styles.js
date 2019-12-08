import styled from 'styled-components';

import Material from 'material-table';

import icons from './icons';

export const StyledTable = styled(Material).attrs(() => ({
  icons,
  options: {
    toolbar: false,
    pageSizeOptions: [],
    pageSize: 20,
    maxBodyHeight: 'calc(100vh - 250px)',
    emptyRowsWhenPaging: false,
  },
}))``;
