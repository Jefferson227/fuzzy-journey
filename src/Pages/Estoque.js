import React from 'react';
import Header from '../Components/Header/Header';
import { ToastContainer, toast } from 'react-toastify';
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
    this.showSuccessToast = this.showSuccessToast.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
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

  deleteProduct() {
    this.showSuccessToast('Produto deletado com sucesso');
    this.hideDecisionModal();
    this.enableViewModeHandler();
  }

  addProduct() {
    this.showSuccessToast('Produto adicionado com sucesso');
    this.hideDecisionModal();
    this.enableViewModeHandler();
  }

  saveChanges() {
    this.showSuccessToast('Alterações salvas com sucesso');
    this.hideDecisionModal();
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

  render() {
    return (
      <div>
        <Header />

        <Container style={{ padding: 10 }}>
          {this.state.mode === 'view'
            ? <SearchProduct
                searchProductHandler={this.searchProductHandler}
                products={this.state.products}
                enableEditModeHandler={this.enableEditModeHandler}
                addNewProductHandler={this.addNewProductHandler} />
            : <AddEditProduct
                product={this.state.productToEdit}
                mode={this.state.mode}
                addProduct={this.addProduct}
                saveChanges={this.saveChanges}
                renderDecisionModal={this.renderDecisionModal}
                isDecisionModalVisible={this.state.isDecisionModalVisible}
                showDecisionModal={this.showDecisionModal}
                hideDecisionModal={this.hideDecisionModal}
                deleteProduct={this.deleteProduct}
                decisionModalTitle="Deletar produto"
                decisionModalMessage="Deseja deletar este produto?" />}
        </Container>

        <ToastContainer />
      </div>
    );
  }
};
