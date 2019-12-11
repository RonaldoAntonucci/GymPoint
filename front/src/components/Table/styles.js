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
    headerStyle: {
      fontWeight: 'bold',
      fontSize: '19px',
      textAlign: 'center',
    },
    cellStyle: {
      fontSize: '19px',
      color: '#666',
      textAlign: 'center',
    },
  },
}))``;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background: none;
    border: 0;
    margin: 0 18px;
  }
`;

export const ActionButton = styled.button`
  color: ${props => props.color};
`;
