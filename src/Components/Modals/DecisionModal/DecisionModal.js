import React from 'react';
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardBody,
  ModalCardTitle,
  ModalCardFooter,
  Button,
  Delete,
} from 'bloomer';

export default (props) => (
  <Modal
    style={{ paddingLeft: 10, paddingRight: 10 }}
    isActive={props.isDecisionModalVisible}>
    <ModalBackground />

    <ModalCard>
      <ModalCardHeader>
        <ModalCardTitle>{props.title}</ModalCardTitle>
        <Delete onClick={props.actionHideHandler} />
      </ModalCardHeader>

      <ModalCardBody>{props.message}</ModalCardBody>

      <ModalCardFooter>
        <Button
          isColor="danger"
          onClick={props.actionYesHandler}>Sim</Button>

        <Button
          isColor="warning"
          onClick={props.actionNoHandler}>Não</Button>
      </ModalCardFooter>
    </ModalCard>
  </Modal>
);
