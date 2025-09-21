import React, { useContext } from 'react';
import "./style.css"

import { Link } from 'react-router-dom';

import ItemCard from "../itemCard"

import { ContextAuth } from '../../Context/AuthContext';

export default function Body() {

    const {
        data
    } = useContext(ContextAuth);

    return (
        <div className='mainContainer bodyBoxColor'>
            <div className='bodyBox'>
                <>
                    {data && data.map(dado => (
                        <Link to={`/item-id/${dado?._id}`} style={{ textDecoration: "none" }} >
                            <ItemCard id="data"
                                name={dado.name}
                                price={dado.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                createdAt={dado.createdAt.split("T")[0]}
                            />
                        </Link>
                    ))}
                </>
            </div>
        </div>
    )
};