import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import history from '~/services/history';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import Form, { FormRow, FormInput } from '~/components/Form';

import palette from '~/styles/palette';

import schema from './validations';

import { Button } from './styles';

import api from '~/services/api';

export default function CreateStudent() {
  const [loading, setLoading] = useState(true);
  const createStudent = useCallback(async data => {
    setLoading(true);
    try {
      const { name, email, age, weight, height } = data;
      await api.post('/students', {
        name,
        email,
        age,
        weight,
        height,
      });

      history.push('/students');
    } catch {
      console.log('error');
    }
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(
    data => {
      createStudent(data);
    },
    [createStudent]
  );
  return (
    <Container>
      <Content>
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          initialData={{ age: 0, weight: 0, height: 0 }}
        >
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
                type="submit"
                color={palette.primary}
                disabled={loading}
              />
            </div>
          </Title>
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
            <FormInput name="age" type="number" label="IDADE" min={0} />
            <FormInput name="weight" type="number" label="PESO" min={0} />
            <FormInput name="height" type="number" label="ALTURA" min={0} />
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
}
