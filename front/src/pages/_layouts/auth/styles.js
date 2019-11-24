import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  border-radius: 4px;
  background: #fff;
  width: 100%;
  max-width: 375px;
  text-align: center;

  nav {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      font-size: 29px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 0 30px 30px;

    strong {
      display: flex;
      align-self: left;
      margin-top: 5px;
      margin-bottom: 5px;
      opacity: 0.7;
    }

    input {
      border: 1px solid;
      border-color: #999;
      border-radius: 4px;
      height: 44px;
      opacity: 0.5;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #999;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`;
