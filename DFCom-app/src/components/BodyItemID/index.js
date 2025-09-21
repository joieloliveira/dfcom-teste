import React, { useContext, useEffect } from 'react';
import "./style.css"

import { useParams } from 'react-router-dom';

import giftBox from "../../img/gift-box.png"

import { ContextAuth } from '../../Context/AuthContext';

export default function BodyItemID() {

    const { id } = useParams();

    const {
        showModal, setShowModal, setModalActive, GetDataReview, dataReview, GetDataId, dataId, GetMediaRating, mediaRating, setReviewId
    } = useContext(ContextAuth);

    const handleShow = dado => {
        setShowModal(!showModal);
        setModalActive(dado);
    }

    console.log(mediaRating.averageRating
);
    

    useEffect(() => {
        GetDataReview(id)
        GetDataId(id)
        GetMediaRating(id)
    }, []);

    return (
        <div className='mainContainer bodyBoxColor'>
            <div className='BodyItemID'>
                {mediaRating && dataReview && dataId?.produto &&
                    <div className='itemID'>
                        <div className='itemDescription'>
                            <img src={giftBox} alt="giftBox" />
                            <div className='attributes'>
                                <p><span>Name: </span>{dataId.produto?.name}</p>
                                <p><span>Price: </span>{dataId?.produto?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                <p><span>Avaliações: </span>{mediaRating?.totalReviews}</p>
                                <p><span>Nota média: </span>{mediaRating.averageRating?.toFixed(2)}</p>
                                <p><span>Category: </span>{dataId.produto?.category}</p>
                                <p><span>Criado em: </span>{dataId.produto?.createdAt.split("T")[0]}</p>
                            </div>
                        </div>
                        <div className='description'>
                            <p><span>Descrição: </span>{dataId.produto?.description}</p>
                        </div>
                        <br></br>
                        <button onClick={() => handleShow("reviewItem")}>Avaliar</button>
                        <br></br>
                        {dataReview?.review && dataReview?.review.map(date => (
                            <div className='comment'>
                                <p><span>Comentario: </span>{date?.comment}</p>
                                <br></br>
                                <p><span>Autor: </span>{date?.author}</p>
                                <br></br>
                                <p><span>Nota: </span>{date?.rating}</p>
                                <br></br>
                                <p><span>Criado em: </span>{date?.createdAt.split("T")[0]}</p>
                                <br></br>
                                <div className='commentButtons'>
                                    <button onClick={() => {handleShow("reviewEdit"); setReviewId(date?._id)}}>Editar</button>
                                    <button onClick={() => {handleShow("reviewDelete"); setReviewId(date?._id)}}>Deletar</button>
                                </div>
                            </div>
                        ))}
                    </div>}
            </div>
        </div>
    )
};