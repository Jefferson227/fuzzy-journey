import React from 'react';
import { Field, Label, Input, Control, Button } from 'bloomer';

const Testing = () => {
  return (
    <div>
      <Field>
        <Label>Name</Label>
        <Control>
          <Input type="text" isColor="success" placeholder="Text input" />
        </Control>
      </Field>
      <Button isColor="info">Button</Button>
    </div>
  );
};

export default Testing;