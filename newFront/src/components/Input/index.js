import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import { Container } from './styles';

export default function newInput({ name, type, placeholder, label, ...rest }) {
  return (
    <Container {...rest}>
      <Input name={name} type={type} placeholder={placeholder} label={label} />
    </Container>
  );
}

newInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

newInput.defaultProps = {
  label: null,
  type: 'text',
  placeholder: '',
};
