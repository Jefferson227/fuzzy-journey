import React from 'react';
import { Field, Input, Control, Container, Box } from 'bloomer';
import Header from '../Components/Header/Header';

const Estoque = () => {
  return (
    <div>
      <Header />
      <Container style={{ padding: 10 }}>
        <Field>
          <Control>
            <Input type="text" isColor="success" placeholder="Digite o nome do produto" />
          </Control>
        </Field>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
      </Container>
    </div>
  );
};

export default Estoque;
