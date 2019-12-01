import React, { useCallback } from 'react';

import { Form, Input } from '@rocketseat/unform';

import Header2 from '~/components/Header2';

import { Container, HButton, InputRow } from './styles';

export default function Formulario({
  title,
  headerButtons,
  inputs,
  schema,
  initialData,
  onSubmit,
}) {
  const handleSubmit = useCallback(
    data => {
      onSubmit(data);
    },
    [onSubmit]
  );

  return (
    <>
      <Header2>
        <strong>{title}</strong>
        <div>
          {headerButtons.map(button => (
            <HButton
              key={button.text}
              onClick={button.onClick}
              color={button.color}
              type={button.submit ? 'submit' : null}
              form={button.submit ? 'form' : null}
            >
              {button.text}
            </HButton>
          ))}
        </div>
      </Header2>
      <Container>
        <Form
          id="form"
          onSubmit={handleSubmit}
          schema={schema}
          initialData={initialData}
        >
          {inputs.map(input => (
            <InputRow area={input.length} key={input[0].name}>
              {input.map(i => (
                <li key={i.name}>
                  {i.label ? <strong>{i.label}</strong> : null}
                  <Input
                    name={i.name}
                    placeholder={i.placeholder}
                    type={i.type}
                  />
                </li>
              ))}
            </InputRow>
          ))}
        </Form>
      </Container>
    </>
  );
}
