import styled from 'styled-components';
import { Input, Form } from '@rocketseat/unform';

import { darken } from 'polished';
import palette from '~/styles/palette';

export const Container = styled.td`
  height: 44px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

export const Pag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;

  button {
    margin: 0 10px;
    height: 100%;
    border-radius: 4px;
    border: 1px solid;
    border-color: ${palette.grey};
    font-weight: bold;
    color: ${palette.dark};
    background-color: ${palette.lightGrey};
    padding: 0 8px;

    &:hover {
      background: ${darken(0.1, palette.lightGrey)};
    }
  }
`;

export const StyledForm = styled(Form)``;

export const StyledInput = styled(Input)`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${palette.grey};
  height: 100%;
  text-align: right;
`;
