import React from 'react';
import Header from '../Components/Header/Header';
import FloatingButton from '../Components/FloatingButton/FloatingButton';
import {
  Field,
  Input,
  Control,
  Container,
  Box,
  Label,
  Button,
  Column,
  Columns,
  Select,
  TextArea,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  Delete,
  ModalCardBody,
  ModalCardFooter,
} from 'bloomer';

export default class Estoque extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      products: [],
      mode: 'view'
    };

    this.searchProductHandler = this.searchProductHandler.bind(this);
    this.addNewProductHandler = this.addNewProductHandler.bind(this);
    this.enableViewModeHandler = this.enableViewModeHandler.bind(this);
    this.enableEditModeHandler = this.enableEditModeHandler.bind(this);
    this.displayDeleteButtonHandler = this.displayDeleteButtonHandler.bind(this);
    this.renderDecisionModal = this.renderDecisionModal.bind(this);
    this.showDecisionModal = this.showDecisionModal.bind(this);
    this.hideDecisionModal = this.hideDecisionModal.bind(this);
  }

  componentDidMount() {
    fetch('/assets/data/estoque.json')
      .then(res => res.json())
      .then(res => {
        const products = res;
        this.setState({ products });
      });
  }

  searchProductHandler(event) {
    const filter = event.target.value;

    fetch('/assets/data/estoque.json')
      .then(res => res.json())
      .then(res => {
        const products = res;
        const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(filter));
        this.setState({ products: filteredProducts });
      });
  }

  addNewProductHandler() {
    this.setState({
      mode: 'add',
      productToEdit: {},
    });
  }

  enableViewModeHandler() {
    this.setState({
      mode: 'view',
      productToEdit: {},
    });
  }

  enableEditModeHandler(product) {
    this.setState({
      mode: 'edit',
      productToEdit: product,
    });
  }

  displayDeleteButtonHandler(displayButton) {
    return displayButton ? (
      <Button
        isColor="danger"
        onClick={this.showDecisionModal}
        style={{ marginRight: 5 }}
        isActive={this.state.mode === 'edit'}>Deletar</Button>
    ) : null;
  }

  showDecisionModal() {
    this.setState({ isDecisionModalVisible: true });
  }

  hideDecisionModal() {
    this.setState({ isDecisionModalVisible: false });
  }

  renderDecisionModal() {
    return (
      <Modal
        style={{ paddingLeft: 10, paddingRight: 10 }}
        isActive={this.state.isDecisionModalVisible}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Deletar</ModalCardTitle>
            <Delete onClick={this.hideDecisionModal} />
          </ModalCardHeader>
          <ModalCardBody>Deseja deletar esse produto?</ModalCardBody>
          <ModalCardFooter>
            <Button
              isColor="danger"
              onClick={this.hideDecisionModal}>Sim</Button>

            <Button
              isColor="warning"
              onClick={this.hideDecisionModal}>Não</Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    );
  }

  render() {
    if (this.state.mode === 'view') {
      return (
        <div>
          <Header />
          <Container style={{ padding: 10 }}>
            <Field>
              <Control>
                <Input
                  type="text"
                  isColor="success"
                  placeholder="Digite o nome do produto"
                  onChange={this.searchProductHandler} />
              </Control>
            </Field>
            { this.state.products.map((product, index) =>
              <Box
                onClick={() => this.enableEditModeHandler(product)}
                key={index}>{ product.productName }</Box>) }
          </Container>
          <FloatingButton addNewProductHandler={this.addNewProductHandler} />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <Container style={{ padding: 10 }}>
            <Field>
              <Control>
                <Label>Produto</Label>
                <Input
                  type="text"
                  isColor="success"
                  defaultValue={this.state.productToEdit.productName}
                  placeholder="ex. Margarina Medalha de Ouro" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Embalagem</Label>
                <Input
                  type="text"
                  isColor="success"
                  defaultValue={this.state.productToEdit.packageContent}
                  placeholder="ex. 1kg" />
              </Control>
            </Field>

            <Field>
              <Label>Unidade de Medida</Label>
              <Control>
                <Select defaultValue={this.state.productToEdit.unitOfMeasurement}>
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
                  defaultValue={this.state.productToEdit.unitPrice}
                  placeholder="10,00" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Preço por Embalagem</Label>
                <Input
                  type="text"
                  isColor="success"
                  defaultValue={this.state.productToEdit.pricePerUnitOfMeasurement}
                  placeholder="10,00" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Quantidade</Label>
                <Input
                  type="text"
                  isColor="success"
                  defaultValue={this.state.productToEdit.quantity}
                  placeholder="10" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Local</Label>
                <Input
                  type="text"
                  isColor="success"
                  defaultValue={this.state.productToEdit.sellingPoint}
                  placeholder="Supermercado Extra" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Observações</Label>
                <TextArea
                  defaultValue={this.state.productToEdit.notes}
                  placeholder="Digite suas anotações aqui" />
              </Control>
            </Field>

            <Columns>
              <Column hasTextAlign="centered">
                <Button
                  isColor="info"
                  style={{ marginRight: 5 }}
                  onClick={this.enableViewModeHandler}
                >{this.state.mode === 'add' ? 'Adicionar' : 'Salvar'}</Button>

                <Button
                  style={{ marginRight: 5 }}
                  isColor="warning">Limpar</Button>

                {this.displayDeleteButtonHandler(this.state.mode === 'edit')}
              </Column>
            </Columns>
            {this.renderDecisionModal()}
          </Container>
        </div>
      );
    }
  }
};
