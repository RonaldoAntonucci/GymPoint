import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import { Container, IcoContent } from './styles';

export default function newInput({
  name,
  type,
  placeholder,
  label,
  ico,
  ...rest
}) {
  return (
    <Container withIco={!!ico} {...rest}>
      {ico && <IcoContent>{ico()}</IcoContent>}
      <Input name={name} type={type} placeholder={placeholder} label={label} />
    </Container>
  );
}

newInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  ico: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

newInput.defaultProps = {
  label: null,
  type: 'text',
  placeholder: '',
  ico: null,
};
