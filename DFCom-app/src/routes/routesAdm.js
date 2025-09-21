import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import ItemId from '../pages/itemId';

export default function RoutesAdm() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/item-id/:id" element={<ItemId />} />
            </Routes>
        </div>
    ); 
}