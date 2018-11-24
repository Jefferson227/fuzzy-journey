import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SearchProduct from '../Components/SearchProduct/SearchProduct';
import AddEditProduct from '../Components/AddEditProduct/AddEditProduct';
import { Container } from 'bloomer';

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
        const filteredProducts = products
          .filter(product => product.productName.toLowerCase().includes(filter.toLowerCase()));
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

  showDecisionModal() {
    this.setState({ isDecisionModalVisible: true });
  }

  hideDecisionModal() {
    this.setState({ isDecisionModalVisible: false });
  }

  render() {
    return (
      <div>
        <Container style={{ padding: 10 }}>
          {this.state.mode === 'view'
            ? <SearchProduct
                {...this} />
            : <AddEditProduct
                {...this}
                decisionModalTitle="Deletar produto"
                decisionModalMessage="Deseja deletar este produto?" />}
        </Container>

        <ToastContainer />
      </div>
    );
  }
};
