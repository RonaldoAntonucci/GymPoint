import styled from 'styled-components';

import palette from '~/styles/palette';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  label {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;
    color: ${palette.dark};
    font-size: 14px;
    line-height: 16px;
  }

  input {
    border: 2px solid ${palette.grey};
    border-radius: 4px;
    height: 44px;
    padding: ${props => (props.withIco ? '0 15px 0 30px' : '0 15px')};
    color: ${palette.dark};
    width: 100%;

    &::placeholder {
      color: ${palette.grey};
      height: 19px;
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

export const IcoContent = styled.div`
  position: absolute;
  margin-left: 30px;
  margin-top: 13px;

  > svg {
    font-size: 18px;
    color: ${palette.darkGrey};
  }
`;
