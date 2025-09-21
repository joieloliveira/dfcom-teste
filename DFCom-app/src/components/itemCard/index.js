import React from 'react';
import "./style.css"

import giftBox from '../../img/gift-box.png';

export default function itemCard(props) {

    var valor = 2000

    return (
        <div className='itemCard' >
            <img src={giftBox} alt="giftBox" />
            <p>Nome: {props.name}</p>
            <p>Preço: {props.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
            <p>Criado: {props.createdAt}</p>
        </div>
    )
};