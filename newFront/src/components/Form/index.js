import styled from 'styled-components';

import { Form } from '@rocketseat/unform';
import Input from '~/components/Input';

export const FormInput = styled(Input)`
  width: 100%;
  & + div {
    margin-left: 20px;
  }
`;

export const FormRow = styled.div`
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default styled(Form)``;
