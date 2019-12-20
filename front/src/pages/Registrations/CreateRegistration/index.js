import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, addMonths } from 'date-fns';
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
  const [plan, setPlan] = useState(null);
  const [studentsPage, setStudentsPage] = useState(1);
  const [plansPage, setPlansPage] = useState(1);
  const [studentsFilter, setStudentsFilter] = useState('');
  const [students, studentTotalPages] = useApiGetRequest(api, '/students', {
    params: { page: studentsPage, q: studentsFilter },
  });
  const [plans, plansTotalPages] = useApiGetRequest(api, '/plans', {
    params: { page: plansPage },
  });

  const [studentOptions, studentData] = useMemo(() => {
    if (students) {
      const opt = [];
      const stdData = [];

      students.forEach(std => {
        opt.push({
          id: std.id,
          title: std.email,
        });

        stdData[std.id] = std;
      });

      return [opt, stdData];
    }
    return [[], []];
  }, [students]);

  const [planOptions, planData] = useMemo(() => {
    if (plans) {
      const opt = [];
      const plnData = [];

      plans.forEach(pln => {
        opt.push({
          id: pln.id,
          title: pln.title,
        });

        plnData[pln.id] = pln;
      });

      return [opt, plnData];
    }
    return [[], []];
  }, [plans]);

  const [submit, submitLoading] = useApiSubmit({
    api,
    url: `/plans`,
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

  const formattedEndDate = useMemo(() => {
    if (planData && planData[plan]) {
      return format(
        addMonths(startDate, planData[plan].duration),
        'MM/dd/yyyy'
      );
    }
    return '';
  }, [plan, planData, startDate]);

  const formattedTotal = useMemo(() => {
    if (planData && planData[plan]) {
      return formatPrice(planData[plan].duration * planData[plan].price);
    }
    return formatPrice(0);
  }, [plan, planData]);

  return (
    <Container>
      <Content>
        <Form
          initialData={registration}
          onSubmit={console.log}
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
              options={planOptions}
              onChange={data => setPlan(data.target.value)}
            />
            <FormDatePicker
              name="start_date"
              placeholder="Escolha a data"
              label="DATA DE INÍCIO"
              initialValue={startDate}
              onChange={setStartDate}
              dateFormat="dd/MM/yyyy"
            />
            <FormInput
              name="end_date"
              type="text"
              value={formattedEndDate}
              readOnly
              label="DATA DE TÉRMINO"
            />
            <FormInput
              name="total"
              type="text"
              value={formattedTotal}
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
