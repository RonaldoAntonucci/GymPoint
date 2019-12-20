import styled from 'styled-components';

import palette from '~/styles/palette';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 5px;
  width: 100%;

  & + div {
    margin-left: 20px;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;
    color: ${palette.dark};
    font-size: 14px;
    line-height: 16px;
  }

  div.react-datepicker-wrapper {
    margin-top: 8px;
    width: 100%;
  }

  input {
    border: 2px solid ${palette.grey};
    border-radius: 4px;
    height: 45px;
    padding: 0 15px;
    color: ${palette.dark};
    width: 100%;

    &::placeholder {
      color: ${palette.grey};
      height: 19px;
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 19px;
    }
  }

  span {
    margin-top: 8px;
    color: ${palette.primary};
    align-self: flex-start;
    font-weight: bold;
  }
`;
