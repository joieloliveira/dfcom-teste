import React, { useContext } from 'react';
import "./style.css"

import { ContextAuth } from '../../Context/AuthContext';

import { useParams } from 'react-router-dom';
import { isDisabled } from '@testing-library/user-event/dist/utils';

export default function ButtonsTop() {

    const { id } = useParams();

    const {
        showModal, setShowModal, setModalActive
    } = useContext(ContextAuth);

    const handleShow = dado => {
        setShowModal(!showModal);
        setModalActive(dado);
    }

    return (
        <div className='mainContainer'>
            <div className='buttonsTop'>
                <button type='button' onClick={() => handleShow("addItem")}
                    style={!id ? {} : { backgroundColor: "gray", pointerEvents: "none" }}
                >ADD NOVO ITEM</button>
                <button type='button' onClick={() => handleShow("editItem")}
                    style={!id ? { backgroundColor: "gray", pointerEvents: "none" } : {}}
                >EDITAR ITEM</button>
                <button type='button' onClick={() => handleShow("deleteItem")}
                    style={!id ? { backgroundColor: "gray", pointerEvents: "none" } : {}}
                >DELETAR ITEM</button>
            </div>
        </div>
    )
};