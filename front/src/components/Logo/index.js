import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

import logo from '~/assets/gymLogo.svg';

export default function Logo({ size, ...rest }) {
  return (
    <Container direction="column" {...rest}>
      <img src={logo} height={size} alt="GymPoint" />
      <strong>GYMPOINT</strong>
    </Container>
  );
}

Logo.propTypes = {
  size: PropTypes.number,
};

Logo.defaultProps = {
  size: 50,
};
