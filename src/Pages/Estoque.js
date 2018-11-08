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
  Select
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
  }

  componentDidMount() {
    fetch('http://localhost:3000/assets/data/estoque.json')
      .then(res => res.json())
      .then(res => {
        const products = res;
        this.setState({ products });
      });
  }

  searchProductHandler(event) {
    const filter = event.target.value;

    fetch('http://localhost:3000/assets/data/estoque.json')
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
                  placeholder="ex. Margarina Medalha de Ouro" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Embalagem</Label>
                <Input
                  type="text"
                  isColor="success"
                  placeholder="ex. 1kg" />
              </Control>
            </Field>

            <Field>
              <Label>Unidade de Medida</Label>
              <Control>
                <Select>
                  <option>Selecione</option>
                  <option>g</option>
                  <option>ml</option>
                  <option>Unidade</option>
                </Select>
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Preço Unitário</Label>
                <Input
                  type="text"
                  isColor="success"
                  placeholder="10,00" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Preço por Embalagem</Label>
                <Input
                  type="text"
                  isColor="success"
                  placeholder="10,00" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Quantidade</Label>
                <Input
                  type="text"
                  isColor="success"
                  placeholder="10" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>Local</Label>
                <Input
                  type="text"
                  isColor="success"
                  placeholder="Supermercado Extra" />
              </Control>
            </Field>

            <Columns>
              <Column hasTextAlign="centered">
                <Button
                  isColor="info"
                  style={{ marginRight: 5 }}
                  onClick={this.enableViewModeHandler}>{this.state.mode === 'add' ? 'Adicionar' : 'Salvar'}</Button>
                <Button
                  isColor="warning"
                  isActive={this.state.mode === 'add'}>Limpar</Button>
              </Column>
            </Columns>
          </Container>
        </div>
      );
    }
  }
};
