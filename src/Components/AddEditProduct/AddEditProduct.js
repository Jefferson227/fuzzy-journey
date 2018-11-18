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


export default class AddEditProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: props.state.productToEdit,
      mode: props.state.mode,
      isDecisionModalVisible: false,
      decisionModalTitle: props.decisionModalTitle,
      decisionModalMessage: props.decisionModalMessage,
    };

    this.addProduct = this.addProduct.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.showSuccessToast = this.showSuccessToast.bind(this);
    this.showDecisionModal = this.showDecisionModal.bind(this);
    this.hideDecisionModal = this.hideDecisionModal.bind(this);
    this.enableViewModeHandler = props.enableViewModeHandler.bind(this);
  }

  displayDeleteButtonHandler() {
    return this.state.mode === 'edit'
      ? <Button
          isColor="danger"
          onClick={this.showDecisionModal}
          style={{ marginRight: 5 }}>Deletar</Button>
      : null
  }

  showSuccessToast(message) {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  addProduct() {
    this.showSuccessToast('Produto adicionado com sucesso');
    this.hideDecisionModal();
    this.enableViewModeHandler();
  }

  deleteProduct() {
    this.showSuccessToast('Produto deletado com sucesso');
    this.hideDecisionModal();
    this.enableViewModeHandler();
  }

  saveChanges() {
    this.showSuccessToast('Alterações salvas com sucesso');
    this.hideDecisionModal();
  }

  showDecisionModal() {
    this.setState({ isDecisionModalVisible: true });
  }

  hideDecisionModal() {
    this.setState({ isDecisionModalVisible: false });
  }

  render() {
    return (
      <div>
        <Field>
          <Control>
            <Label>Produto</Label>
            <Input
              type="text"
              isColor="success"
              defaultValue={this.state.product.productName}
              placeholder="ex. Margarina Medalha de Ouro" />
          </Control>
        </Field>

        <Field>
          <Control>
            <Label>Embalagem</Label>
            <Input
              type="text"
              isColor="success"
              defaultValue={this.state.product.packageContent}
              placeholder="ex. 1kg" />
          </Control>
        </Field>

        <Field>
          <Label>Unidade de Medida</Label>
          <Control>
            <Select defaultValue={this.state.product.unitOfMeasurement}>
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
              defaultValue={this.state.product.unitPrice}
              placeholder="10,00" />
          </Control>
        </Field>

        <Field>
          <Control>
            <Label>Preço por Embalagem</Label>
            <Input
              type="text"
              isColor="success"
              defaultValue={this.state.product.pricePerUnitOfMeasurement}
              placeholder="10,00" />
          </Control>
        </Field>

        <Field>
          <Control>
            <Label>Quantidade</Label>
            <Input
              type="text"
              isColor="success"
              defaultValue={this.state.product.quantity}
              placeholder="10" />
          </Control>
        </Field>

        <Field>
          <Control>
            <Label>Local</Label>
            <Input
              type="text"
              isColor="success"
              defaultValue={this.state.product.sellingPoint}
              placeholder="Supermercado Extra" />
          </Control>
        </Field>

        <Field>
          <Control>
            <Label>Observações</Label>
            <TextArea
              defaultValue={this.state.product.notes}
              placeholder="Digite suas anotações aqui" />
          </Control>
        </Field>

        <Columns>
          <Column hasTextAlign="centered">
            <Button
              isColor="info"
              style={{ marginRight: 5 }}
              onClick={this.state.mode === 'add' ? this.addProduct : this.saveChanges}
            >{this.state.mode === 'add' ? 'Adicionar' : 'Salvar'}</Button>

            <Button
              style={{ marginRight: 5 }}
              isColor="warning">Limpar</Button>

            {this.displayDeleteButtonHandler()}
          </Column>
        </Columns>

        <DecisionModal
          isDecisionModalVisible={this.state.isDecisionModalVisible}
          title={this.state.decisionModalTitle}
          message={this.state.decisionModalMessage}
          actionShowModal={this.showDecisionModal}
          actionHideHandler={this.hideDecisionModal}
          actionYesHandler={this.deleteProduct}
          actionNoHandler={this.hideDecisionModal} />
      </div>
    );
  }
};
