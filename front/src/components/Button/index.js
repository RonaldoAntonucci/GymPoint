import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import palette from '~/styles/palette';

function Button({ text, ico, type, color, loading, ...rest }) {
  const isLoading = useMemo(() => loading, [loading]);
  return (
    <Container type={type} color={color} disabled={isLoading} {...rest}>
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
  loading: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  color: palette.primary,
  ico: null,
  loading: false,
};

export default Button;
