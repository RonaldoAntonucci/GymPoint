import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import { Container, IcoContent } from './styles';

function NInput({
  name,
  type,
  placeholder,
  label,
  ico,
  min,
  max,
  disabled,
  onChange,
  readOnly,
  ...rest
}) {
  return (
    <Container withIco={!!ico} {...rest}>
      {ico && <IcoContent ico={ico} />}
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        label={label}
        min={min}
        max={max}
        disabled={disabled}
        onChange={onChange}
        readOnly={readOnly}
        {...rest}
      />
    </Container>
  );
}

NInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  ico: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

NInput.defaultProps = {
  label: null,
  type: 'text',
  placeholder: '',
  ico: null,
  min: null,
  max: null,
  disabled: false,
  onChange: null,
  readOnly: false,
};

export default NInput;
