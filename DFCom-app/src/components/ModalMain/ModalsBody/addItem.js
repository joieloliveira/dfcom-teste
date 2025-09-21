import React, { useContext, useState } from 'react';
import "./style.css"
import Modal from 'react-bootstrap/Modal';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ContextAuth } from '../../../Context/AuthContext';

function AddItem() {

    const [itemRegistre, setItemRegistre] = useState();

    const CreatUserFormSchema = z.object({
        name: z.string()
            .nonempty('Campo Obrigatório'),
        price: z.string()
            .nonempty('Campo Obrigatório'),
        category: z.string()
            .nonempty('Campo Obrigatório'),
        description: z.string()
            .nonempty('Campo Obrigatório'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(CreatUserFormSchema)
    })

    const ValueInput = e => setItemRegistre({ ...itemRegistre, [e.target.name]: e.target.value });

    const {
        showModal, setShowModal, PostItem
    } = useContext(ContextAuth);

    const handleClose = () => setShowModal(!showModal);

    const AddItem = () => {
        PostItem(itemRegistre)
        handleClose()
    }

    return (
        <>
            <div className='modalBody'>
                <h4>Add novo item</h4>
                <label>name</label>
                <input type="text" id="name" {...register('name')}
                    onChange={ValueInput}
                    autoComplete />
                {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
                <label>price</label>
                <input type="text" id="price" {...register('price')}
                    onChange={ValueInput}
                    autoComplete />
                {errors.price && <span style={{ color: "red" }}>{errors.price.message}</span>}
                <label>category</label>
                <input type="text" id="category" {...register('category')}
                    onChange={ValueInput}
                    autoComplete />
                {errors.category && <span style={{ color: "red" }}>{errors.category.message}</span>}
                <label>description</label>
                <input type="text" id="description" {...register('description')}
                    onChange={ValueInput}
                    autoComplete />
                {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
                <div className='modalFooter'>
                    <button onClick={handleSubmit(AddItem)}>CONFIRMA</button>
                    <button onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </>
    );
}

export default AddItem;