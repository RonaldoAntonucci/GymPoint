import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useApiSubmit } from '~/Hooks';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import Form, { FormRow, FormInput } from '~/components/Form';

import palette from '~/styles/palette';

import schema from './validations';

import { Button } from './styles';

import api from '~/services/api';

function CreateStudent({ location }) {
  const [student, setStudent] = useState(
    location.state ? location.state.data : null
  );
  const [submit, loading] = useApiSubmit({
    api,
    url: `/students`,
    success: () =>
      toast.success(
        `Usuário ${student ? 'editado' : 'cadastrado'} com sucesso.`
      ),
    failed: () => toast.error('Não foi possível salvar este aluno.'),
    setResponse: setStudent,
  });

  return (
    <Container>
      <Content>
        <Form
          schema={schema}
          onSubmit={data =>
            submit({ id: student ? student.id : null, ...data })
          }
          initialData={student}
          loading={loading.toString()}
        >
          <Title>
            <h1>{student ? 'Edição de aluno' : 'Cadastro de aluno'}</h1>
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
                loading={loading}
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
            <FormInput
              name="age"
              type="number"
              label="IDADE"
              min={0}
              step={1}
            />
            <FormInput
              name="weight"
              type="number"
              label="PESO (EM GRAMAS)"
              min={0}
              step={0.01}
            />
            <FormInput
              name="height"
              type="number"
              label="ALTURA (EM CM)"
              min={0}
              step={0.01}
            />
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
}

CreateStudent.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: PropTypes.object,
    }),
  }),
};

CreateStudent.defaultProps = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: null,
    }),
  }),
};

export default CreateStudent;
