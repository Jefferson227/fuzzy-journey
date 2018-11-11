import React from 'react';
import { Field, Control, Input, Box } from 'bloomer';
import FloatingButton from '../FloatingButton/FloatingButton';

export default (props) => (
  <div>
    <Field>
      <Control>
        <Input
          type="text"
          isColor="success"
          placeholder="Digite o nome do produto"
          onChange={props.searchProductHandler} />
      </Control>
    </Field>

    {props.products.map((product, index) =>
      <Box
        onClick={() => props.enableEditModeHandler(product)}
        key={index}>{ product.productName }</Box>)}

    <FloatingButton addNewProductHandler={props.addNewProductHandler} />
  </div>
);