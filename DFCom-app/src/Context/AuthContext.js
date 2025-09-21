import React, { createContext, useState, useEffect } from 'react';

import api from '../config/configApi';

const ContextAuth = createContext();

function AuthProvider({ children }) {

    const [modalActive, setModalActive] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [dataReview, setDataReview] = useState([]);
    const [dataId, setDataId] = useState([]);
    const [reviewId, setReviewId] = useState([]);
    const [mediaRating, setMediaRating] = useState([]);
    const [postItem, setPostItem] = useState([]);

    useEffect(() => {
        GetData()

    }, []);

    if (loading) {
        return (<h1 style={{ color: "red" }}>Loading</h1>)
    }

    const GetData = async () => {
        setLoading(true)
        try {
            const response = await api.get("product/")
            setData(response.data.product?.docs);
            //console.log(response.data.product?.docs);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const GetDataReview = async (props) => {
        try {
            const response = await api.get(`review/${props}`)
            setDataReview(response.data);
            //console.log(response.data?.review);
        } catch (error) {
            console.log(error);
        }
    }

    const GetDataId = async (props) => {
        try {
            const response = await api.get(`product/${props}`)
            setDataId(response?.data);
            //console.log(response?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const GetMediaRating = async (props) => {
        try {
            const response = await api.get(`review-rating/${props}`)
            setMediaRating(response?.data);
            //console.log(response?.data);
        } catch (error) {
            console.log(error);
        }
    }

    //post, put, delete ===========================================

    const PostItem = async (props) => {
        try {
            const response = await api.post(`product/`, props)
            console.log(response?.data);
            GetData()
        } catch (error) {
            console.log(error);
        }
    }

    const DeleteItem = async (props) => {
        try {
            const response = await api.delete(`product/${props}`)
            console.log(response?.data);
            GetData()
        } catch (error) {
            console.log(error);
        }
    }

    const PutItem = async (props) => {
        try {
            const response = await api.put(`product/${props.id}`, props.itemRegistre)
            console.log(response?.data);
            GetData()
        } catch (error) {
            console.log(error);
        }
    }

    const DeleteReview = async (props) => {
        try {
            const response = await api.delete(`review/${props}`)
            window.location.reload();
            console.log(response?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const PutReview = async (props) => {
        try {
            const response = await api.put(`review/${reviewId}`, props)
            window.location.reload();
            console.log(response?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const PostReview = async (props) => {
        try {
            const response = await api.post(`review/`, props)
            window.location.reload();
            console.log(response?.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <ContextAuth.Provider value={{
            showModal, setShowModal, DeleteItem,
            modalActive, setModalActive, PutItem,
            data, setData, GetDataReview, dataReview,
            GetDataId, dataId, GetMediaRating, mediaRating,
            PostItem, postItem, setPostItem, DeleteReview,
            reviewId, setReviewId, PutReview, PostReview

        }}>
            {children}
        </ContextAuth.Provider>
    );
}

export { ContextAuth, AuthProvider };