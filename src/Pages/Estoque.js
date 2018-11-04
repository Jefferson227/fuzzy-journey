import React from 'react';
import { Field, Input, Control, Container, Box } from 'bloomer';
import Header from '../Components/Header/Header';
import FloatingButton from '../Components/FloatingButton/FloatingButton';

export default class Estoque extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/assets/data/estoque.json')
      .then(res => res.json())
      .then(res => {
        const products = res;
        this.setState({ products });
      });
  }

  render() {
    return (
      <div>
        <Header />
        <Container style={{ padding: 10 }}>
          <Field>
            <Control>
              <Input type="text" isColor="success" placeholder="Digite o nome do produto" />
            </Control>
          </Field>
          { this.state.products.map((product, index) => <Box key={index}>{ product.productName }</Box>) }
        </Container>
        <FloatingButton />
      </div>
    );
  }
};
