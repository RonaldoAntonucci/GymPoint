import styled from 'styled-components';

import palette from '~/styles/palette';

import StyledButton from '~/components/Button';

export const Options = styled.div`
  input {
    margin-left: 20px;
  }
`;

export const Button = styled(StyledButton).attrs(() => ({
  color: palette.primary,
}))`
  color: ${palette.white};
`;
