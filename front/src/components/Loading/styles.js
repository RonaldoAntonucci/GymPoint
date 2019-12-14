import styled from 'styled-components';
import { Spinner } from 'react-awesome-spinners';

import palette from '~/styles/palette';

export const Container = styled.div`
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 34px;
    padding-right: 30px;
    height: calc(100vh - 164px);
  }
`;

export const LoadingAnimation = styled(Spinner).attrs(props => ({
  color: palette.primary,
  size: 500,
}))``;
