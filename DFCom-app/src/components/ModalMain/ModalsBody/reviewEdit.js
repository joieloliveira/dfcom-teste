import React, { useContext, useState } from 'react';
import "./style.css"

import { ContextAuth } from '../../../Context/AuthContext';

function ReviewEdit() {

    const [reviewEdit, setReviewEdit] = useState({});

    const ValueInput = e => setReviewEdit({ ...reviewEdit, [e.target.name]: e.target.value });

    const {
        showModal, setShowModal, PutReview
    } = useContext(ContextAuth);

    const handleClose = () => setShowModal(!showModal);

    const EditReview = () => {
        PutReview(reviewEdit)
        handleClose()
    }

    return (
        <>
            <div className='modalBody'>
                <h4>Editar Avaliação</h4>
                <label>Seu nome</label>
                <input type="text" id="author" name="author"
                    onChange={ValueInput} 
                    autoComplete />
                <label>Avaliar 1 a 5</label>
                <input type="text" id="rating" name="rating"
                    onChange={ValueInput}
                    autoComplete />
                <label>Comentario</label>
                <input type="text" id="comment" name="comment"
                    onChange={ValueInput} 
                    autoComplete />
                <div className='modalFooter'>
                    <button onClick={EditReview}>CONFIRMA</button>
                    <button onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </>
    );
}

export default ReviewEdit;