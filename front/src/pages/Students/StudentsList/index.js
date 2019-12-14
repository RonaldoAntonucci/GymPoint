import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Form } from '@rocketseat/unform';
import { useApiGetRequest } from '~/Hooks';

import Container from '~/components/Container';
import Input from '~/components/Input';
import Content from '~/components/Content';
import Table from '~/components/Table2';
import Confirm from '~/components/Confirm';

import palette from '~/styles/palette';

import { Options, Button, Title } from './styles';

import api from '~/services/api';

export default function StudentsList() {
  const [page, setPage] = useState(1);

  const [students, totalPages] = useApiGetRequest(api, '/students', {
    params: { page },
  });

  const deleteStudent = useCallback(id => {
    console.log(id);
  }, []);

  const handleSearch = useCallback(data => {
    console.log(data);
  });

  const handleDelete = useCallback(
    id => {
      confirmAlert({
        customUI: (
          { onClose } // eslint-disable-line
        ) => (
          <Confirm
            callback={() => deleteStudent(id)}
            onClose={onClose}
            title="Deseja excluir este aluno?"
            message="Se confirmar, o aluno será deletado. Isso é irreversível. Deseja
                mesmo excluí-lo?"
          />
        ),
      });
    },
    [deleteStudent]
  );

  return (
    <Container>
      <Title>
        <h1>Gerenciando alunos</h1>

        <Options>
          <Link to="/students/create">
            <Button ico={MdAdd} text="CADASTRAR" type="button" />
          </Link>
          <Form onSubmit={handleSearch}>
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
          columns={[
            {
              title: 'NOME',
              field: 'name',
            },
            {
              title: 'E-MAIL',
              field: 'email',
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
              onClick: console.log,
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
