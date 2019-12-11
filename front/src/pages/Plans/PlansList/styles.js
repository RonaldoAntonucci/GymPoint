import styled from 'styled-components';

import palette from '~/styles/palette';

import StyledButton from '~/components/Button';
import StyledTitle from '~/components/Title';

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

export const Title = styled(StyledTitle)``;
