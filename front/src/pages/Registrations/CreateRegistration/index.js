import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useApiSubmit, useApiGetRequest } from '~/hooks';

import { formatPrice } from '~/util/format';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import Form, {
  FormRow,
  FormDatePicker,
  FormSelect,
  FormInput,
} from '~/components/Form';

import palette from '~/styles/palette';

import { Button } from './styles';

import api from '~/services/api';

function CreateRegistration({ location }) {
  const [registration, setRegistration] = useState(
    location.state ? location.state.data : null
  );
  const [startDate, setStartDate] = useState(new Date());
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [studentsPage, setStudentsPage] = useState(1);
  const [plansPage, setPlansPage] = useState(1);
  const [studentsFilter, setStudentsFilter] = useState('');

  const [students, studentTotalPages] = useApiGetRequest(api, '/students', {
    params: { page: studentsPage, q: studentsFilter },
  });
  const [plans, plansTotalPages] = useApiGetRequest(api, '/plans', {
    params: { page: plansPage },
  });

  const studentOptions = useMemo(
    () =>
      students.map(student => ({
        id: student.id,
        title: student.email,
      })),
    [students]
  );

  const [submit, submitLoading] = useApiSubmit({
    api,
    url: `/registrations`,
    success: () =>
      toast.success(
        `Matrícula ${registration ? 'editada' : 'cadastrada'} com sucesso.`
      ),
    failed: () => toast.error('Não foi possível salvar essa matrícula.'),
    setResponse: setRegistration,
  });

  const loading = useMemo(() => {
    (submitLoading || !plans || !students).toString();
  }, [plans, students, submitLoading]);

  const handleSubmit = useCallback(
    data => {
      const formattedData = {
        ...data,
        start_date: format(data.start_date, "yyyy-MM-dd'T'HH:mm:ssxx", {
          locale: pt,
        }),
      };
      submit(formattedData);
    },
    [submit]
  );

  const handleChangePlan = useCallback(
    data => {
      const plan = plans.find(p => p.id === Number(data));
      setSelectedPlan(plan);
    },
    [plans]
  );

  const endDate = useMemo(
    () =>
      selectedPlan &&
      addMonths(startDate, selectedPlan.duration, {
        locale: pt,
      }),

    [selectedPlan, startDate]
  );

  const totalPrice = useMemo(
    () =>
      formatPrice(
        selectedPlan ? selectedPlan.price * selectedPlan.duration : 0
      ),
    [selectedPlan]
  );

  return (
    <Container>
      <Content>
        <Form
          initialData={registration}
          onSubmit={handleSubmit}
          loading={loading}
        >
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
              name="student_id"
              field="name"
              placeholder="Buscar aluno"
              label="ALUNO"
              options={studentOptions}
            />
          </FormRow>
          <FormRow>
            <FormSelect
              name="plan_id"
              label="PLANO"
              placeholder="Selecione o plano"
              options={plans}
              onChange={data => handleChangePlan(data.target.value)}
            />
            <FormDatePicker
              name="start_date"
              placeholder="Escolha a data"
              label="DATA DE INÍCIO"
              initialValue={startDate}
              onChange={setStartDate}
            />
            <FormDatePicker
              name="end_date"
              value={endDate}
              label="DATA DE TÉRMINO"
              readOnly
            />
            <FormInput
              name="total"
              type="text"
              value={totalPrice}
              readOnly
              label="VALOR FINAL"
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
