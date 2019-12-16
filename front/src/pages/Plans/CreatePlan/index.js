import React, { useCallback, useState, useMemo } from 'react';
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

// import schema from './validations';

import { Button } from './styles';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

function CreatePlan({ location }) {
  const [plan, setPlan] = useState(location.state ? location.state.data : null);
  const [duration, setDuration] = useState(plan ? plan.duration : 0);
  const [price, setPrice] = useState(plan ? plan.price : 0);
  const [submit, loading] = useApiSubmit({
    api,
    url: `/plans`,
    success: () =>
      toast.success(`Plano ${plan ? 'editado' : 'cadastrado'} com sucesso.`),
    failed: () => toast.error('Não foi possível salvar este plano.'),
    setResponse: setPlan,
  });

  const total = useMemo(() => formatPrice(duration * price), [duration, price]);

  return (
    <Container>
      <Content>
        <Form
          // schema={schema}
          onSubmit={data => submit({ id: plan ? plan.id : null, ...data })}
          initialData={plan}
          loading={loading.toString()}
        >
          <Title>
            <h1>{plan ? 'Edição de planos' : 'Cadastro de planos'}</h1>
            <div>
              <Link to="/plans">
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
              name="title"
              type="text"
              placeholder="Digite o título do plano"
              label="TITULO DO PLANO"
            />
          </FormRow>
          <FormRow>
            <FormInput
              name="duration"
              type="number"
              step={1}
              placeholder="Exemplo: 12"
              label="DURACAO(em meses)"
              min={0}
              onChange={e => setDuration(e.target.value)}
            />
            <FormInput
              name="price"
              type="number"
              step="0.01"
              placeholder="Exemplo: 99,90"
              label="PREÇO MENSAL"
              min={0}
              onChange={e => setPrice(e.target.value)}
            />
            <FormInput
              name="total"
              type="text"
              value={total}
              readOnly
              label="PREÇO TOTAL"
            />
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
}

CreatePlan.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: PropTypes.object,
    }),
  }),
};

CreatePlan.defaultProps = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: null,
    }),
  }),
};

export default CreatePlan;
