import React, { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { MdAdd, MdSearch } from 'react-icons/md';

import Table from '~/components/Table';
import Formulario from '~/components/Formulario';
import Header2 from '~/components/Header2';
import api from '~/services/api';

import { HButton, Search, Actions, EditButton, DeleteButton } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer('Idade deve ser um número inteiro')
    .required('A idade é obrigatória')
    .positive('Idade inválida'),
  weight: Yup.number('O peso deve ser um número')
    .positive('Peso inválido')
    .required('O peso é obrigatório'),
  height: Yup.number('A altura deve ser um número')
    .required('A altura é obrigatória')
    .positive('Altura inválida'),
});

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(false);
  const [student, setStudent] = useState({});

  const loadStudents = useCallback(async () => {
    const response = await api.get('/students');

    setStudents(response.data);
  }, []);

  const createStudent = useCallback(
    async data => {
      try {
        await api.post('/students', data);
        loadStudents();
        setForm(false);
      } catch (err) {
        console.log(err);
      }
    },
    [loadStudents]
  );

  const getStudent = useCallback(async id => {
    const { data } = await api.get(`/students/${id}`);
    setStudent(data);
    setForm(true);
  }, []);

  const deleteStudent = useCallback(
    async id => {
      try {
        await api.delete(`/students/${id}`);
        loadStudents();
      } catch (err) {
        console.log(err);
      }
    },
    [loadStudents]
  );

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleFormBack = useCallback(() => setForm(false), []);

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

  const handlePage = useCallback(page => {
    console.log(page);
  }, []);

  const handleAdd = useCallback(() => {
    setStudent({});
    setForm(true);
  }, []);

  const handleFormSubmit = useCallback(
    data => {
      createStudent(data);
    },
    [createStudent]
  );

  return form ? (
    <Formulario
      initialData={
        Object.entries(student).length !== 0
          ? student
          : { age: 0, weight: 0, height: 0 }
      }
      onSubmit={handleFormSubmit}
      schema={schema}
      title="Cadastro de aluno"
      headerButtons={[
        {
          text: 'VOLTAR',
          color: '#999',
          onClick: handleFormBack,
        },
        {
          text: 'CADASTRAR',
          color: '#ee4d64',
          submit: true,
        },
      ]}
      inputs={[
        [
          {
            label: 'NOME COMPLETO',
            name: 'name',
            placeholder: 'Digite o nome do aluno',
          },
        ],
        [
          {
            label: 'ENDEREÇO DE E-MAIL',
            name: 'email',
            type: 'email',
            placeholder: 'exemplo@email.com',
          },
        ],
        [
          {
            label: 'IDADE',
            name: 'age',
            type: 'number',
          },
          {
            label: 'PESO(em kg)',
            name: 'weight',
          },
          {
            label: 'ALTURA',
            name: 'height',
          },
        ],
      ]}
    />
  ) : (
    <>
      <Header2>
        <strong>Gerenciando alunos</strong>
        <div>
          <HButton color="#ee4d64" type="button" onClick={handleAdd}>
            <MdAdd color="#fff" size={20} />
            <div>CADASTRAR</div>
          </HButton>

          <Search>
            <MdSearch size={16} color="#999" />
            <input type="text" placeholder="Buscar aluno" />
          </Search>
        </div>
      </Header2>
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
            render: data => (
              <>
                <Actions>
                  <EditButton type="button" onClick={() => handleEdit(data.id)}>
                    editar
                  </EditButton>
                  <DeleteButton
                    onClick={() => handleDelete(data.id)}
                    type="button"
                  >
                    apagar
                  </DeleteButton>
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
