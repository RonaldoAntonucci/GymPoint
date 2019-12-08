import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import palette from '~/styles/palette';

export default function Button({ text, ico, type, color, ...rest }) {
  return (
    <Container type={type} color={color} {...rest}>
      {ico && <div>{ico()}</div>}
      <span>{text}</span>
    </Container>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  ico: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  color: palette.primary,
  ico: null,
};
