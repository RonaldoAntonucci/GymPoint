import React from 'react';

import { Container } from './styles';

import logo from '~/assets/gymLogo.svg';

export default function Logo({ size }) {
  return (
    <Container direction="column">
      <img src={logo} color="black" height={size} alt="GymPoint" />
      <strong>GYMPOINT</strong>
    </Container>
  );
}
