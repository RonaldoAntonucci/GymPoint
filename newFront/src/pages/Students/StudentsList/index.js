import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Form } from '@rocketseat/unform';

import Title from '~/components/Title';
import Input from '~/components/Input';
import Content from '~/components/Content';
import Table from '~/components/Table';

import { Container, Options, Button } from './styles';

import api from '~/services/api';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadStudents = useCallback(async () => {
    try {
      const response = await api.get(`/students?page=${page}`);
      setStudents(response.data.students);
      if (lastPage !== response.data.lastPage) {
        setLastPage(response.data.lastPage);
      }
    } catch {
      console.log('error');
    }
  }, [lastPage, page]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents, page]);

  const handlePage = useCallback(
    paginate => {
      switch (paginate) {
        case null:
          break;
        case 'next': {
          setPage(page + 1);
          break;
        }
        case 'previous': {
          setPage(page - 1);
          break;
        }
        case 'first': {
          setPage(1);
          break;
        }
        case 'last': {
          setPage(lastPage);
          break;
        }
        default: {
          setPage(paginate);
        }
      }
    },
    [lastPage, page]
  );

  return (
    <Container>
      <Title>
        <h1>Gerenciando alunos</h1>

        <Options>
          <Link to="/students/create">
            <Button ico={MdAdd} text="CADASTRAR" type="button" />
          </Link>
          <Form onSubmit={() => {}}>
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
          pagination={{ handlePage, lastPage }}
        />
      </Content>
    </Container>
  );
}
