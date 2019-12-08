import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Form } from '@rocketseat/unform';

import Title from '~/components/Title';
import Input from '~/components/Input';
import Content from '~/components/Content';
import Table from '~/components/Table';

import palette from '~/styles/palette';

import { Container, Options, Button } from './styles';

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
        console.log('error');
      }
      setLoading(false);
    },
    [lastPage, page]
  );

  const getStudent = useCallback(id => {
    console.log(id);
  }, []);

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

  const handleEdit = useCallback(
    id => {
      getStudent(id);
    },
    [getStudent]
  );

  const handleDelete = useCallback(
    id => {
      deleteStudent(id);
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
                fontWeight: 'bold',
                fontSize: '19px',
              },
              cellStyle: {
                fontSize: '19px',
                color: '#666',
              },
            },
            {
              title: 'E-MAIL',
              field: 'email',
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
              title: 'IDADE',
              field: 'age',
              type: 'numeric',
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
          data={students}
          pagination={{ handlePage, lastPage, page }}
          action={[
            {
              text: 'editar',
              onClick: handleEdit,
              color: palette.info,
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
