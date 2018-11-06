import React from 'react';
import { Field, Input, Control, Container, Box, Label } from 'bloomer';
import Header from '../Components/Header/Header';
import FloatingButton from '../Components/FloatingButton/FloatingButton';

export default class Estoque extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      products: [],
      mode: 'view'
    };

    this.searchProductHandler = this.searchProductHandler.bind(this);
    this.addNewProductHandler = this.addNewProductHandler.bind(this);
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
    this.setState({ mode: 'add' });
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
            { this.state.products.map((product, index) => <Box key={index}>{ product.productName }</Box>) }
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
              <Control>
                <Label>Unidade de Medida</Label>
                <Input
                  type="text"
                  isColor="success"
                  placeholder="g, ml ou unidade" />
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
          </Container>
        </div>
      );
    }
  }
};
