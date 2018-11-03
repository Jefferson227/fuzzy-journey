import React from 'react';
import { Field, Label, Input, Control, Button, Container } from 'bloomer';

const Testing = () => {
  return (
    <div>
      <Container style={{ padding: 10 }}>
        <Field>
          <Label>Name</Label>
          <Control>
            <Input type="text" isColor="success" placeholder="Text input" />
          </Control>
        </Field>
        <Button isColor="info">Button</Button>
      </Container>
    </div>
  );
};

export default Testing;