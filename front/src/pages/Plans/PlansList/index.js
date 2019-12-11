import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import { MdAdd } from 'react-icons/md';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Table from '~/components/Table';
import Confirm from '~/components/Confirm';

import palette from '~/styles/palette';

import { Options, Button, Title } from './styles';

import api from '~/services/api';

export default function PlansList() {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadPlans = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/plans');
      setPlans(data.plans);
      setLastPage(data.lastPage);
    } catch {
      toast.error('Não foi possível carregar os planos.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans, page]);

  const handlePage = useCallback(
    paginate => {
      switch (paginate) {
        case null:
          break;
        case 'next': {
          if (page < lastPage) setPage(page + 1);
          break;
        }
        case 'previous': {
          if (page > 1) setPage(page - 1);
          break;
        }
        case 'first': {
          if (page !== 1) setPage(1);
          break;
        }
        case 'last': {
          if (page !== lastPage) setPage(lastPage);
          break;
        }
        default: {
          setPage(paginate);
        }
      }
    },
    [lastPage, page]
  );

  const deletePlan = useCallback(id => {
    console.log(id);
  }, []);

  const handleDelete = useCallback(
    id => {
      confirmAlert({
        customUI: (
          { onClose } // eslint-disable-line
        ) => (
          <Confirm
            callback={() => deletePlan(id)}
            onClose={onClose}
            title="Deseja excluir este aluno?"
            message="Se confirmar, o aluno será deletado. Isso é irreversível. Deseja
                mesmo excluí-lo?"
          />
        ),
      });
    },
    [deletePlan]
  );

  return (
    <Container>
      <Title>
        <h1>Gerenciando Planos</h1>
        <Options>
          <Link to="/plans/create">
            <Button ico={MdAdd} text="CADASTRAR" type="button" />
          </Link>
        </Options>
      </Title>
      <Content>
        <Table
          isLoading={loading}
          data={plans}
          columns={[
            {
              title: 'TÍTULO',
              field: 'title',
              headerStyle: {
                fontWeight: 'bold',
                fontSize: '19px',
              },
              cellStyle: {
                fontSize: '19px',
                color: '#666',
              },
            },
            {
              title: 'DURAÇÃO',
              field: 'duration',
              headerStyle: {
                fontWeight: 'bold',
                fontSize: '19px',
              },
              cellStyle: {
                fontSize: '19px',
                color: '#666',
              },
            },
            {
              title: 'VALOR p/MÊS',
              field: 'price',
              headerStyle: {
                fontWeight: 'bold',
                fontSize: '19px',
              },
              cellStyle: {
                fontSize: '19px',
                color: '#666',
              },
            },
          ]}
          pagination={{ handlePage, lastPage, page }}
          action={[
            {
              link: '/plans',
              text: 'editar',
              color: palette.info,
              onClick: () => {},
            },
            {
              text: 'apagar',
              onClick: handleDelete,
              color: palette.primary,
            },
          ]}
        />
      </Content>
    </Container>
  );
}
