import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { useApiGetRequest } from '~/hooks';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import Table2 from '~/components/Table2';

import palette from '~/styles/palette';

import api from '~/services/api';

import { Options, Button } from './styles';

export default function HelpOrdersList() {
  return (
    <Container>
      <Title>
        <h1>Pedidos de auxílio</h1>
        <Options>
          <Link to="/help-orders">
            <Button ico={MdAdd} text="CADASTRAR" type="button" />
          </Link>
        </Options>
      </Title>
    </Container>
  );
}
