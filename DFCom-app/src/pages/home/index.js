import React from 'react';

import Header from "../../components/Header"
import Carousel from "../../components/Carousel"
import ButtonsTop from "../../components/ButtonsTop"
import Body from "../../components/Body"
import Footer from "../../components/Footer"

export default function Home() {

    return (
        <div>
            <Header />
            <Carousel />
            <ButtonsTop />
            <Body />
            <Footer />
        </div>
    )
};