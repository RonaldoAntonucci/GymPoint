import styled from 'styled-components';

import palette from '~/styles/palette';

import Logo from '~/assets/gymLogo.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    margin: 10px;
    color: ${palette.primary};
  }
`;

export const GymLogo = styled(Logo)`
  color: ${palette.primary};
`;
