import styled from 'styled-components';

import palette from '~/styles/palette';

export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  background: ${palette.white};
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;

  h1 {
    margin-bottom: 15px;
  }

  p {
    font-size: 18px;
    margin-bottom: 50px;

    strong {
      color: ${palette.dark};
    }
  }

  div {
    display: flex;
    justify-content: flex-end;
  }

  button {
    height: 40px;
  }

  button + button {
    margin-left: 10px;
  }
`;
