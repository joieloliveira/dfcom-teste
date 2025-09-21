import React from 'react';
import "./style.css"

import { Link } from 'react-router-dom';

import ModalMain from '../ModalMain';

import logo from '../../img/logo.png';
import user from '../../img/user.png';

export default function Header() {

    return (
        <div className='mainContainer headerColor' >
            <ModalMain></ModalMain>
            <div className='headerBox'>
                <Link to={`/`} style={{ textDecoration: "none" }} >
                    <img src={logo} alt="logo" />
                </Link>
                <div className='user'>
                    <p>SEJA BEM VINDO</p>
                    <img src={user} alt="user" />
                </div>
            </div>
        </div>
    )
};