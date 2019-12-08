import React from 'react';
import { Link } from 'react-router-dom';

import { MdAdd } from 'react-icons/md';

import { Form } from '@rocketseat/unform';

import Input from '~/components/Input';

import { Container, Title, Button } from './styles';

export default function StudentsList() {
  return (
    <Container>
      <Title>
        <h1>Lista de alunos</h1>

        <div>
          <Link to="/students/create">
            <Button>
              <div>
                <MdAdd />
              </div>
              <span>CADASTRAR</span>
            </Button>
          </Link>
          <Form onSubmit={() => {}}>
            <Input
              type="text"
              name="search"
              placeholder="Pesquisar por alunos"
            />
          </Form>
        </div>
      </Title>
    </Container>
  );
}
