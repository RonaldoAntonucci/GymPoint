import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  align-self: center;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  color: #444;

  div {
    display: flex;
    align-items: center;

    button {
      margin-right: 16px;
    }
  }
`;

export const Button = styled.button`
  background: #ee4d64;
  height: 44px;
  border: 0;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;

  &:hover {
    background: ${props => darken(0.03, '#de3b3b')};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #fff;
      font-size: 20px;
    }
  }

  span {
    color: #fff;
    flex: 1;
    text-align: center;
    font-size: 16px;
    line-height: 19px;
    font-weight: bold;
    margin: 0 12px;
  }
`;
