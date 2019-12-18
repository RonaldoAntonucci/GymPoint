import styled from 'styled-components';

import { Form } from '@rocketseat/unform';
import Input from '~/components/Input';
import Select from './SelectInput';
import DatePicker from './DatePicker';

import Loading from '~/components/Loading';

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

export const FormSelect = styled(Select)`
  width: 100%;
  & + div {
    margin-left: 20px;
  }
`;

export const FormDatePicker = styled(DatePicker)``;

export default styled(Form).attrs(props => ({
  children: props.loading === 'true' ? Loading() : props.children,
}))``;
