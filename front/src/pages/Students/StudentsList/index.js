import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Form } from '@rocketseat/unform';

import Container from '~/components/Container';
import Input from '~/components/Input';
import Content from '~/components/Content';
import Table from '~/components/Table';
import Confirm from '~/components/Confirm';

import palette from '~/styles/palette';

import { Options, Button, Title } from './styles';

import api from '~/services/api';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadStudents = useCallback(
    async filter => {
      setLoading(true);
      try {
        const q = filter ? `&q=${filter}` : '';
        if (filter) setPage(1);
        const response = await api.get(`/students?page=${page}${q}`);
        setStudents(response.data.students);
        if (lastPage !== response.data.lastPage) {
          setLastPage(response.data.lastPage);
        }
      } catch {
        toast.error('Não foi possível carregar os alunos.');
      }
      setLoading(false);
    },
    [lastPage, page]
  );

  const deleteStudent = useCallback(id => {
    console.log(id);
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents, page]);

  const handleSearch = useCallback(
    data => {
      loadStudents(data.search);
    },
    [loadStudents]
  );

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
          isLoading={loading}
          columns={[
            {
              title: 'NOME',
              field: 'name',
              headerStyle: {
                textAlign: 'left',
              },
              cellStyle: {
                textAlign: 'left',
              },
            },
            {
              title: 'E-MAIL',
              field: 'email',
            },
            {
              title: 'IDADE',
              field: 'age',
              type: 'numeric',
              headerStyle: {
                textAlign: 'right',
              },
              cellStyle: {
                textAlign: 'right',
              },
            },
          ]}
          data={students}
          pagination={{ handlePage, lastPage, page }}
          action={[
            {
              link: '/students',
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
