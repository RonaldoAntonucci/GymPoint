import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useApiSubmit } from '~/hooks';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import Form, { FormRow, FormDatePicker, FormSelect } from '~/components/Form';

import palette from '~/styles/palette';

import { Button } from './styles';

import api from '~/services/api';

function CreateRegistration({ location }) {
  const [registration, setRegistration] = useState(
    location.state ? location.state.data : { age: 0, height: 0, weight: 0 }
  );
  const [submit, loading] = useApiSubmit({
    api,
    url: `/plans`,
    success: () =>
      toast.success(
        `Matrícula ${registration ? 'editada' : 'cadastrada'} com sucesso.`
      ),
    failed: () => toast.error('Não foi possível salvar essa matrícula.'),
    setResponse: setRegistration,
  });
  return (
    <Container>
      <Content>
        <Form onSubmit={console.log}>
          <Title>
            <h1>
              {registration ? 'Edição de matrícula' : 'Cadastro de matrícula'}
            </h1>
            <div>
              <Link to="/registrations">
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
            <FormSelect
              name="student"
              field="name"
              placeholder="Buscar aluno"
              label="ALUNO"
              options={[{ id: 1, title: 'joao' }, { id: 2, title: 'Zé' }]}
            />
          </FormRow>
          <FormRow>
            <FormSelect
              name="plan"
              label="PLANO"
              placeholder="Selecione o plano"
              options={[{ id: 1, title: 'plan1' }, { id: 2, title: 'plan2' }]}
            />
            <FormDatePicker
              name="start_date"
              placeholder="Escolha a data"
              label="DATA DE INÍCIO"
              initialValue={new Date()}
            />
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
}

CreateRegistration.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: PropTypes.object,
    }),
  }),
};

CreateRegistration.defaultProps = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: null,
    }),
  }),
};

export default CreateRegistration;
