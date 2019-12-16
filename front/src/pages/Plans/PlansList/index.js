import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { MdAdd } from 'react-icons/md';

import { useApiGetRequest, useHandleDelete, useHandleEdit } from '~/hooks';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Table from '~/components/Table2';

import palette from '~/styles/palette';

import { Options, Button, Title } from './styles';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

export default function PlansList() {
  const [page, setPage] = useState(1);

  const handleEdit = useHandleEdit('plans/create');
  const handleDelete = useHandleDelete(
    'Se confirmar, o plano será deletado. Isso é irreversível. Desejamesmo excluí-lo?'
  );

  const [data, totalPages] = useApiGetRequest(api, '/plans', {
    params: { page },
  });

  const plans = useMemo(() => {
    return !data
      ? null
      : data.map(plan => ({
          ...plan,
          priceFormatted: formatPrice(plan.price),
          durationFormatted:
            plan.duration > 1
              ? `${plan.duration} meses`
              : `${plan.duration} mês`,
        }));
  }, [data]);

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
          data={plans}
          columns={[
            {
              title: 'TÍTULO',
              field: 'title',
              styles: {
                align: 'left',
              },
            },
            {
              title: 'DURAÇÃO',
              field: 'durationFormatted',
              type: 'numeric',
            },
            {
              title: 'VALOR p/MÊS',
              field: 'priceFormatted',
              type: 'currency',
            },
          ]}
          pagination={{ page, totalPages, onPageChange: setPage }}
          actions={[
            {
              name: 'editar',
              onClick: handleEdit,
              color: palette.info,
            },
            {
              name: 'apagar',
              onClick: handleDelete,
              color: palette.danger,
            },
          ]}
        />
      </Content>
    </Container>
  );
}
