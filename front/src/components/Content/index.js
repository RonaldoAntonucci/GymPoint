import styled from 'styled-components';

import palette from '~/styles/palette';

export default styled.div`
  margin-top: 20px;
  padding: 30px 10px 10px 30px;
  background: ${palette.white};
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  max-height: calc(100vh - 164px);
`;
