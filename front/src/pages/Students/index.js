import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import Table from '~/components/Table';
import api from '~/services/api';
import {
  Header,
  ButtonCadastrar,
  Search,
  Actions,
  EditButton,
  DeleteButton,
} from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);
    }
    loadStudents();
  }, []);
  return (
    <>
      <Header>
        <strong>Gerenciando alunos</strong>
        <div>
          <ButtonCadastrar type="button">
            <MdAdd color="#fff" size={20} />
            <div>CADASTRAR</div>
          </ButtonCadastrar>

          <Search>
            <MdSearch size={16} color="#999" />
            <input type="text" placeholder="Buscar aluno" />
          </Search>
        </div>
      </Header>
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
          {
            render: () => (
              <>
                <Actions>
                  <EditButton type="button">editar</EditButton>
                  <DeleteButton type="button">apagar</DeleteButton>
                </Actions>
              </>
            ),
          },
        ]}
        data={students}
      />
    </>
  );
}
