import React, { useState, useEffect, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Table2 from '~/components/Table2';

import palette from '~/styles/palette';

import api from '~/services/api';

export default function RegistrationsList() {
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        setLoading(true);
        const response = await api.get(`/registrations`, {
          params: {
            page,
          },
        });
        setTotalPages(response.headers.total_pages);
        const data = response.data.map(registration => ({
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
        setRegistrations(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadRegistrations();
  }, [page]);

  const handleEdit = useCallback(data => {
    console.log(data);
  }, []);

  const handlePage = useCallback(p => {
    setPage(p);
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
            onPageChange: handlePage,
          }}
        />
      </Content>
    </Container>
  );
}
