import styled from 'styled-components';

import palette from '~/styles/palette';

import StyledButton from '~/components/Button';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  align-self: center;
  margin-top: 30px;
`;

export const Options = styled.div`
  display: flex;
  flex-basis: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  input {
    margin-left: 20px;
  }
`;

export const Button = styled(StyledButton).attrs(() => ({
  color: palette.primary,
}))`
  color: ${palette.white};
`;
