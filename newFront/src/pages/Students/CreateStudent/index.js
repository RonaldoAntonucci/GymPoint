import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import Form, { FormRow, FormInput } from '~/components/Form';
import Input from '~/components/Input';

import { Button } from './styles';

import palette from '~/styles/palette';

export default function CreateStudent() {
  return (
    <Container>
      <Content>
        <Title>
          <h1>Cadastro de aluno</h1>
          <div>
            <Link to="/students">
              <Button
                ico={MdKeyboardArrowLeft}
                text="VOLTAR"
                type="button"
                color={palette.grey}
              />
            </Link>
            <Button
              ico={MdDone}
              text="SALVAR"
              type="button"
              color={palette.primary}
            />
          </div>
        </Title>
        <Form>
          <FormRow>
            <FormInput
              name="name"
              type="text"
              placeholder="Nome do Aluno"
              label="NOME COMPLETO"
            />
          </FormRow>
          <FormRow>
            <FormInput
              name="email"
              type="text"
              placeholder="exemplo@email.com"
              label="ENDEREÇO DE EMAIL"
            />
          </FormRow>
          <FormRow>
            <FormInput name="age" type="number" label="IDADE" />
            <FormInput name="weight" type="number" label="PESO" />
            <FormInput name="height" type="number" label="ALTURA" />
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
}
