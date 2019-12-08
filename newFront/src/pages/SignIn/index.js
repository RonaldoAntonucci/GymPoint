import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, TextInput, Logo, Button } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Logo size={53} />
      <Form schema={schema} onSubmit={handleSubmit}>
        <TextInput
          label="SEU E-MAIL"
          name="email"
          type="email"
          placeholder="exemplo@email.com"
        />
        <TextInput
          label="SUA SENHA"
          name="password"
          type="password"
          placeholder="*******"
        />

        <Button type="submit">
          {loading ? 'Loading...' : 'Entrar no sistema'}
        </Button>
      </Form>
    </Container>
  );
}
