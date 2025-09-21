import React, { useContext, useState } from 'react';
import "./style.css"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ContextAuth } from '../../../Context/AuthContext';

import { useParams } from 'react-router-dom';

function ReviewItem() {

    const { id } = useParams();

    const [reviewPost, setReviewPost] = useState({});

    const CreatUserFormSchema = z.object({
        author: z.string()
            .nonempty('Campo Obrigatório'),
        rating: z.string()
            .nonempty('Campo Obrigatório'),
        comment: z.string()
            .nonempty('Campo Obrigatório'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(CreatUserFormSchema)
    })

    const ValueInput = e => setReviewPost({ ...reviewPost, [e.target.name]: e.target.value });

    const {
        showModal, setShowModal, PostReview
    } = useContext(ContextAuth);

    const handleClose = () => setShowModal(!showModal);

    const AddReview = () => {
        PostReview({ ...reviewPost, productId: id })
        handleClose()
    }

    return (
        <>
            <div className='modalBody'>
                <h4>Avaliar item</h4>
                <label>Seu nome</label>
                <input type="text" id="author" {...register('author')}
                    onChange={ValueInput}
                    autoComplete />
                {errors.author && <span style={{ color: "red" }}>{errors.author.message}</span>}
                <label>Avaliar 1 a 5</label>
                <input type="text" id="rating" {...register('rating')}
                    onChange={ValueInput}
                    autoComplete />
                {errors.rating && <span style={{ color: "red" }}>{errors.rating.message}</span>}
                <label>Comentario</label>
                <input type="text" id="comment" {...register('comment')}
                    onChange={ValueInput}
                    autoComplete />
                {errors.comment && <span style={{ color: "red" }}>{errors.comment.message}</span>}
                <div className='modalFooter'>
                    <button onClick={handleSubmit(AddReview)}>CONFIRMA</button>
                    <button onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </>
    );
}

export default ReviewItem;