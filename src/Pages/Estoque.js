import React from 'react';
import Header from '../Components/Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SearchProduct from '../Components/SearchProduct/SearchProduct';
import AddEditProduct from '../Components/AddEditProduct/AddEditProduct';
import {
  Container,
  Button,
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
              onClick={this.deleteProduct}>Sim</Button>

            <Button
              isColor="warning"
              onClick={this.hideDecisionModal}>Não</Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    );
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
               displayDeleteButtonHandler={this.displayDeleteButtonHandler}
               renderDecisionModal={this.renderDecisionModal} />}
        </Container>

        <ToastContainer />
      </div>
    );
  }
};
