import React, { useRef, useEffect, useState, useMemo } from 'react';
import ReactDatePicker, { setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

setDefaultLocale(pt);

function DatePicker({
  name,
  label,
  initialValue,
  onChange,
  dateFormat,
  value,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(initialValue || defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactDatePicker
        name={fieldName}
        selected={value || selected}
        onChange={date => {
          setSelected(date);
          onChange(date);
        }}
        ref={ref}
        defaultValue={new Date()}
        dateFormat={dateFormat}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  initialValue: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  dateFormat: PropTypes.string,
};

DatePicker.defaultProps = {
  label: null,
  initialValue: null,
  onChange: () => {},
  dateFormat: 'dd/MM/yyyy',
};

export default DatePicker;
