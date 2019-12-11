import React from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Button';

import { Container } from './styles';

import palette from '~/styles/palette';

export default function Confirm({ callback, onClose, title, message }) {
  return (
    <Container>
      <h1>{title}</h1>
      <p>{message}</p>
      <div>
        <Button
          type="button"
          onClick={onClose}
          text="Não"
          color={palette.darkGrey}
        />

        <Button
          type="button"
          text="Sim"
          onClick={() => {
            callback();
            onClose();
          }}
        />
      </div>
    </Container>
  );
}

Confirm.propTypes = {
  callback: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

Confirm.defaultProps = {
  title: 'Você está certo disso?',
  message: 'Você deseja confirmar esta ação?',
};
