import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Form } from '@rocketseat/unform';
import { useApiGetRequest, useHandleDelete, useHandleEdit } from '~/Hooks';

import Container from '~/components/Container';
import Input from '~/components/Input';
import Content from '~/components/Content';
import Table from '~/components/Table2';

import palette from '~/styles/palette';

import { Options, Button, Title } from './styles';

import api from '~/services/api';

export default function StudentsList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const handleEdit = useHandleEdit('students/create');
  const handleDelete = useHandleDelete(
    'Se confirmar, o aluno será deletado. Isso é irreversível. Desejamesmo excluí-lo?'
  );

  const [students, totalPages, loading] = useApiGetRequest(api, '/students', {
    params: { page, q: filters.search },
  });

  return (
    <Container>
      <Title>
        <h1>Gerenciando alunos</h1>

        <Options>
          <Link to="/students/create">
            <Button ico={MdAdd} text="CADASTRAR" type="button" />
          </Link>
          <Form onSubmit={setFilters}>
            <Input
              type="text"
              name="search"
              placeholder="Pesquisar por alunos"
              ico={MdSearch}
            />
          </Form>
        </Options>
      </Title>
      <Content>
        <Table
          isLoading={loading}
          columns={[
            {
              title: 'NOME',
              field: 'name',
              styles: {
                align: 'left',
              },
            },
            {
              title: 'E-MAIL',
              field: 'email',
              styles: {
                align: 'left',
              },
            },
            {
              title: 'IDADE',
              field: 'age',
              type: 'numeric',
            },
          ]}
          data={students}
          pagination={{
            page,
            totalPages,
            onPageChange: setPage,
          }}
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
