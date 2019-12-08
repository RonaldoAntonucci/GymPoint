import styled from 'styled-components';
import palette from '~/styles/palette';

import Input from '~/components/Input';
import GymLogo from '~/components/Logo';

export const Container = styled.div`
  border-radius: 4px;
  background: ${palette.white};
  width: 100%;
  max-width: 375px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 50px 30px;
`;

export const TextInput = styled(Input)`
  margin-bottom: 20px;
`;

export const Logo = styled(GymLogo)`
  font-size: 30px;
`;

export const Button = styled.button`
  display: flex;
  flex: 1;
  width: 100%;
  background-color: ${palette.primary};
  border: 0;
  border-radius: 4px;
  height: 44px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${palette.white};
`;
