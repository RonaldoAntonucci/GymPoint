import React, { useState, useCallback, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useApiGetRequest } from '~/Hooks';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Table2 from '~/components/Table2';

import palette from '~/styles/palette';

import api from '~/services/api';

export default function RegistrationsList() {
  const [page, setPage] = useState(1);
  const [data, totalPages] = useApiGetRequest(
    api,
    '/registrations',
    { params: { page } },
    []
  );

  const registrations = useMemo(() => {
    return !data
      ? null
      : data.map(registration => ({
          id: registration.id,
          start_date: format(
            parseISO(registration.start_date),
            "dd 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
          end_date: format(
            parseISO(registration.end_date),
            "dd 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
          studentName: registration.student.name,
          planTitle: registration.plan.title,
          active: registration.active,
        }));
  }, [data]);

  const handleEdit = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Content>
        <Table2
          data={registrations}
          columns={[
            {
              title: 'ALUNO',
              field: 'studentName',
              styles: {
                align: 'left',
              },
            },
            {
              title: 'PLANO',
              field: 'planTitle',
            },
            {
              title: 'INÍCIO',
              field: 'start_date',
              type: 'date',
            },
            {
              title: 'TÉRMINO',
              field: 'end_date',
              type: 'date',
            },
            {
              title: 'ATIVA',
              field: 'active',
              type: 'boolean',
            },
          ]}
          actions={[
            {
              name: 'editar',
              onClick: handleEdit,
              color: palette.info,
            },
            {
              name: 'apagar',
              onClick: console.log,
              color: palette.danger,
            },
          ]}
          pagination={{
            page,
            totalPages,
            onPageChange: setPage,
          }}
        />
      </Content>
    </Container>
  );
}
