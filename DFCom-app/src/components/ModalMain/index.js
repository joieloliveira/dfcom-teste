import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';

import AddItem from "./ModalsBody/addItem"
import DeleteItem from "./ModalsBody/deleteItem"
import EditItem from "./ModalsBody/editItem"
import ReviewItem from "./ModalsBody/reviewItem"
import ReviewEdit from "./ModalsBody/reviewEdit"
import ReviewDelete from "./ModalsBody/reviewDelete"

import { ContextAuth } from '../../Context/AuthContext';

function ModalMain() {

  const {
    showModal, setShowModal, modalActive
  } = useContext(ContextAuth);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body style={{ backgroundColor: 'var(--BGcolor2)', borderRadius: '0.4rem', padding: 20 }}>
          {modalActive == 'addItem' && (<AddItem />)}
          {modalActive == 'deleteItem' && (<DeleteItem />)}
          {modalActive == 'editItem' && (<EditItem />)}
          {modalActive == 'reviewItem' && (<ReviewItem />)}
          {modalActive == 'reviewEdit' && (<ReviewEdit />)}
          {modalActive == 'reviewDelete' && (<ReviewDelete />)}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalMain;