import React from 'react';
import { Select } from '@rocketseat/unform';
import { Container } from './styles';

export default function SelectInput({ ...rest }) {
  return (
    <Container>
      <Select {...rest} />
    </Container>
  );
}
