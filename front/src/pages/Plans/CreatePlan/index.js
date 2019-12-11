import React, { useCallback, useState, useEffect, useMemo } from 'react';
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

// import schema from './validations';

import { Button } from './styles';

import api from '~/services/api';

function CreatePlan({ match }) {
  const id = match.params;
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({});
  const [priceInput, setPriceInput] = useState(0);
  const [durationInput, setDurationInput] = useState(0);

  const submitPlan = useCallback(async (data, planId) => {
    setLoading(true);
    try {
      const method = planId ? api.put : api.post;
      const complement = planId ? `/${planId}` : '';
      const { title, duration, price } = data;
      await method(`/plans${complement}`, { title, duration, price });

      toast.success(`Plano ${planId ? 'editado' : 'cadastrado'} com sucesso.`);

      history.push('/plans');
      setLoading(false);
    } catch {
      toast.error('Não foi possível salvar este plano.');
      setLoading(false);
    }
  }, []);

  const loadPlan = useCallback(async planId => {
    setLoading(true);
    try {
      const response = await api.get(`/plans/${planId}`);
      const { data } = response;
      setLoading(false);
      setPriceInput(data.price);
      setDurationInput(data.duration);
      setPlan(data);
    } catch {
      toast.error('Não foi possível carregar este plano');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id.id) loadPlan(id.id);
  }, [id, loadPlan]);

  const handleSubmit = useCallback(
    data => {
      console.log(data);
      submitPlan(data, id.id);
    },
    [submitPlan, id.id]
  );

  const total = useMemo(() => durationInput * priceInput, [
    durationInput,
    priceInput,
  ]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <Container>
      <Content>
        <Form
          // schema={schema}
          onSubmit={handleSubmit}
          initialData={Object.entries(plan).length !== 0 ? { ...plan } : null}
        >
          <Title>
            <h1>{id ? 'Edição de planos' : 'Cadastro de planos'}</h1>
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
              onChange={e => setDurationInput(e.target.value)}
            />
            <FormInput
              name="price"
              type="number"
              step="0.01"
              placeholder="Exemplo: 99,90"
              label="PREÇO MENSAL"
              min={0}
              // context={createPlanContext}
              onChange={e => setPriceInput(e.target.value)}
            />
            <FormInput
              name="total"
              type="number"
              value={total}
              readOnly
              label="PREÇO TOTAL"
              step="0.01"
            />
          </FormRow>
        </Form>
      </Content>
    </Container>
  );
}

CreatePlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

CreatePlan.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

export default CreatePlan;
