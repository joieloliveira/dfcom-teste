import React, { useContext, useState } from 'react';
import "./style.css"

import { useParams } from 'react-router-dom';

import { ContextAuth } from '../../../Context/AuthContext';

function EditItem() {

    const { id } = useParams();

    const [itemRegistre, setItemRegistre] = useState();

    const ValueInput = e => setItemRegistre({ ...itemRegistre, [e.target.name]: e.target.value });

    const {
        showModal, setShowModal, PutItem
    } = useContext(ContextAuth);

    const handleClose = () => setShowModal(!showModal);

    const EditItem = () => {
        PutItem({itemRegistre:itemRegistre, id:id})
        handleClose()
    }

    return (
        <>
            <div className='modalBody'>
                <h4>Editar item</h4>
                <label>name</label>
                <input type="text" id="name" name="name"
                    onChange={ValueInput}
                    autoComplete />
                
                <label>price</label>
                <input type="text" id="price" name="price"
                    onChange={ValueInput}
                    autoComplete />
                
                <label>category</label>
                <input type="text" id="category" name="category"
                    onChange={ValueInput}
                    autoComplete />
                
                <label>description</label>
                <input type="text" id="description" name="description"
                    onChange={ValueInput}
                    autoComplete />
               
                <div className='modalFooter'>
                    <button onClick={EditItem}>CONFIRMA</button>
                    <button onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </>
    );
}

export default EditItem;