import styled, { css } from 'styled-components';

import palette from '~/styles/palette';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  thead,
  tbody {
    text-align: left;
    tr {
      color: #666;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
    }

    tr + tr {
      border-top: 1px solid ${palette.secondary};
    }

    td,
    th {
      padding: 16px 0;
    }
  }
`;

export const TableFooter = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;
  width: 100%;

  justify-content: flex-end;
  align-items: center;

  input {
    width: 50px;
    text-align: center;
    padding-left: 15px;
    height: 35px;
    margin-left: 20px;
    border-radius: 50%;
    border: 1px solid ${palette.primary};
  }
`;

export const TableFooterButton = styled.button`
  background: ${props => (props.disabled ? palette.white : palette.primary)};
  color: ${props => (props.disabled ? palette.darkGrey : palette.white)};
  padding: 10px 15px;
  border-radius: 4px;
  border: 0;
  margin-left: 20px;

  ${props =>
    props.disabled &&
    css`
      border: 2px solid ${palette.grey};
    `}

  &:hover {
    ${props =>
      props.disabled &&
      css`
        cursor: not-allowed;
      `}
  }
`;

export const ActionButton = styled.button`
  color: ${props => props.color};
  background: transparent;
  border: 0;

  &:first-child {
    margin-right: 20px;
  }
`;

export const TableTd = styled.td`
  text-align: ${props => props.align || 'center'};
`;
