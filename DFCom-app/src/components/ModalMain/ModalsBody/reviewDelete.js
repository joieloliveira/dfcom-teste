import React, { useContext } from 'react';
import "./style.css"

import { ContextAuth } from '../../../Context/AuthContext';

function ReviewDelete() {

    const {
        showModal, setShowModal, DeleteReview, reviewId
    } = useContext(ContextAuth);

    const handleClose = () => setShowModal(!showModal);

    const ReviewDeleteID = () => {
        DeleteReview(reviewId)
        handleClose()
    }

    return (
        <>
            <div className='modalBody'>
                <h4>Deletar Avaliação</h4>
                <h6>Deseja deletar sua Avaliação</h6>
                <div className='modalFooter'>
                    <button onClick={ReviewDeleteID}>CONFIRMA</button>
                    <button onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </>
    );
}

export default ReviewDelete;