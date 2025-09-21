import React, { useContext } from 'react';
import "./style.css"
import { useParams, useNavigate } from 'react-router-dom';

import { ContextAuth } from '../../../Context/AuthContext';

function DeleteItem() {

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        setShowModal, DeleteItem
    } = useContext(ContextAuth);

    const handleClose = () => setShowModal(false);

    const ItemDelete = () => {
        DeleteItem(id)
        navigate("/")
        handleClose()
    }

    return (
        <>
            <div className='modalBody'>
                <h4>Deletar item</h4>
                <h6>Deseja deletar esse item</h6>
                <div className='modalFooter'>
                    <button onClick={ItemDelete}>CONFIRMA</button>
                    <button onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </>
    );
}

export default DeleteItem;