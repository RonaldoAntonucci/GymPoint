import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  background-color: ${props => props.color};
  border: 0;
  border-radius: 4px;
  height: 44px;
  align-items: center;
  padding: 10px;

  &:hover {
    background: ${props => darken(0.15, props.color)};
  }

  > div {
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
      font-size: 20px;
    }
  }

  span {
    font-weight: bold;
  }
`;
