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

    this.searchProductHandler = this.searchProductHandler.bind(this);
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

  render() {
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
        <FloatingButton />
      </div>
    );
  }
};
