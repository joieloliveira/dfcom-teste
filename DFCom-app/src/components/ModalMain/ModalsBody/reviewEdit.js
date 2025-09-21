import React, { useContext, useState } from 'react';
import "./style.css"

import { ContextAuth } from '../../../Context/AuthContext';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

function ReviewEdit() {

    const [reviewEdit, setReviewEdit] = useState({});

    const ValueInput = e => setReviewEdit({ ...reviewEdit, [e.target.name]: e.target.value });

    const CreatUserFormSchema = z.object({
        rating: z.number({ invalid_type_error: "Deve ser um número" })
            .min(1, "O valor mínimo é 1")
            .max(5, "O valor máximo é 5"),
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(CreatUserFormSchema)
    })

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
                <input type="number" {...register("rating", { valueAsNumber: true })}
                    onChange={ValueInput}
                    autoComplete />
                    {errors.rating && <span style={{ color: "red" }}>{errors.rating.message}</span>}
                <label>Comentario</label>
                <input type="text" id="comment" name="comment"
                    onChange={ValueInput}
                    autoComplete />
                <div className='modalFooter'>
                    <button onClick={handleSubmit(EditReview)}>CONFIRMA</button>
                    <button onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </>
    );
}

export default ReviewEdit;