import React from 'react';
import DecisionModal from '../Modals/DecisionModal/DecisionModal';
import {
  Field,
  Control,
  Label,
  Input,
  Select,
  TextArea,
  Columns,
  Column,
  Button,
} from 'bloomer';

export default (props) => (
  <div>
    <Field>
      <Control>
        <Label>Produto</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.product.productName}
          placeholder="ex. Margarina Medalha de Ouro" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Embalagem</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.product.packageContent}
          placeholder="ex. 1kg" />
      </Control>
    </Field>

    <Field>
      <Label>Unidade de Medida</Label>
      <Control>
        <Select defaultValue={props.product.unitOfMeasurement}>
          <option value="">Selecione</option>
          <option value="g">Grama</option>
          <option value="ml">Mililitro</option>
          <option value="unidade">Unidade</option>
        </Select>
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Preço Unitário</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.product.unitPrice}
          placeholder="10,00" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Preço por Embalagem</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.product.pricePerUnitOfMeasurement}
          placeholder="10,00" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Quantidade</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.product.quantity}
          placeholder="10" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Local</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.product.sellingPoint}
          placeholder="Supermercado Extra" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Observações</Label>
        <TextArea
          defaultValue={props.product.notes}
          placeholder="Digite suas anotações aqui" />
      </Control>
    </Field>

    <Columns>
      <Column hasTextAlign="centered">
        <Button
          isColor="info"
          style={{ marginRight: 5 }}
          onClick={props.mode === 'add' ? props.addProduct : props.saveChanges}
        >{props.mode === 'add' ? 'Adicionar' : 'Salvar'}</Button>

        <Button
          style={{ marginRight: 5 }}
          isColor="warning">Limpar</Button>

        {props.displayDeleteButtonHandler(props.mode === 'edit')}
      </Column>
    </Columns>

    <DecisionModal
      isDecisionModalVisible={props.isDecisionModalVisible}
      title={props.decisionModalTitle}
      message={props.decisionModalMessage}
      actionHideHandler={props.hideDecisionModal}
      actionYesHandler={props.deleteProduct}
      actionNoHandler={props.hideDecisionModal} />
  </div>
);
