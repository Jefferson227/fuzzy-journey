import React from 'react';
import DecisionModal from '../Modals/DecisionModal/DecisionModal';
import { toast } from 'react-toastify';
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

const displayDeleteButtonHandler = (props) => (
  props.state.mode === 'edit'
    ? <Button
        isColor="danger"
        onClick={props.showDecisionModal}
        style={{ marginRight: 5 }}>Deletar</Button>
    : null
);

const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
}

const addProduct = (props) => {
  showSuccessToast('Produto adicionado com sucesso');
  props.hideDecisionModal();
  props.enableViewModeHandler();
}

const deleteProduct = (props) => {
  showSuccessToast('Produto deletado com sucesso');
  props.hideDecisionModal();
  props.enableViewModeHandler();
}

const saveChanges = (props) => {
  showSuccessToast('Alterações salvas com sucesso');
  props.hideDecisionModal();
}

export default (props) => (
  <div>
    <Field>
      <Control>
        <Label>Produto</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.state.productToEdit.productName}
          placeholder="ex. Margarina Medalha de Ouro" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Embalagem</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.state.productToEdit.packageContent}
          placeholder="ex. 1kg" />
      </Control>
    </Field>

    <Field>
      <Label>Unidade de Medida</Label>
      <Control>
        <Select defaultValue={props.state.productToEdit.unitOfMeasurement}>
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
          defaultValue={props.state.productToEdit.unitPrice}
          placeholder="10,00" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Preço por Embalagem</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.state.productToEdit.pricePerUnitOfMeasurement}
          placeholder="10,00" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Quantidade</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.state.productToEdit.quantity}
          placeholder="10" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Local</Label>
        <Input
          type="text"
          isColor="success"
          defaultValue={props.state.productToEdit.sellingPoint}
          placeholder="Supermercado Extra" />
      </Control>
    </Field>

    <Field>
      <Control>
        <Label>Observações</Label>
        <TextArea
          defaultValue={props.state.productToEdit.notes}
          placeholder="Digite suas anotações aqui" />
      </Control>
    </Field>

    <Columns>
      <Column hasTextAlign="centered">
        <Button
          isColor="info"
          style={{ marginRight: 5 }}
          onClick={props.state.mode === 'add' ? () => addProduct(props) : () => saveChanges(props)}
        >{props.state.mode === 'add' ? 'Adicionar' : 'Salvar'}</Button>

        <Button
          style={{ marginRight: 5 }}
          isColor="warning">Limpar</Button>

        {displayDeleteButtonHandler(props)}
      </Column>
    </Columns>

    <DecisionModal
      isDecisionModalVisible={props.state.isDecisionModalVisible}
      title={props.decisionModalTitle}
      message={props.decisionModalMessage}
      actionShowModal={props.showDecisionModal}
      actionHideHandler={props.hideDecisionModal}
      actionYesHandler={() => deleteProduct(props)}
      actionNoHandler={props.hideDecisionModal} />
  </div>
);
