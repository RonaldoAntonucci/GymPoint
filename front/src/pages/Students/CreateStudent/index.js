import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import history from '~/services/history';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import Form, { FormRow, FormInput } from '~/components/Form';

import palette from '~/styles/palette';

import schema from './validations';

import { Button } from './styles';

import api from '~/services/api';

function CreateStudent({ match }) {
  const id = match.params;
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({});

  const submitStudent = useCallback(async (data, studentId) => {
    setLoading(true);
    try {
      const method = studentId ? api.put : api.post;
      const complement = studentId ? `/${studentId}` : '';
      const { name, email, age, weight, height } = data;
      await method(`/students${complement}`, {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success(
        `Usuário ${studentId ? 'editado' : 'cadastrado'} com sucesso.`
      );

      history.push('/students');
      setLoading(false);
    } catch {
      toast.error('Não foi possível salvar este aluno.');
      setLoading(false);
    }
  }, []);

  const loadStudent = useCallback(async studentId => {
    setLoading(true);
    try {
      const response = await api.get(`/students/${studentId}`);
      const { data } = response;
      setStudent(data);
      setLoading(false);
    } catch {
      toast.error('Não foi possível carregar este aluno');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    if (id.id) loadStudent(id.id);
    return function cleanup() {
      abortController.abort();
    };
  }, [id, loadStudent]);

  const handleSubmit = useCallback(
    data => {
      submitStudent(data, id.id);
    },
    [submitStudent, id]
  );
  return (
    <Container>
      <Content>
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          initialData={Object.entries(student).length !== 0 ? student : null}
        >
          <Title>
            <h1>{id ? 'Edição de aluno' : 'Cadastro de aluno'}</h1>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

CreateStudent.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

export default CreateStudent;
