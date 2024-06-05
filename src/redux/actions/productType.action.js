import {

    POST_PRODUCT_TYPE_REQUEST,
    POST_PRODUCT_TYPE_SUCCESS,
    POST_PRODUCT_TYPE_ERROR,
    PRODUCT_TYPE_SEARCH_REQUEST,
    PRODUCT_TYPE_SEARCH_SUCCESS,
    PRODUCT_TYPE_SEARCH_ERROR,
    DELETE_PRODUCT_TYPE_REQUEST,
    DELETE_PRODUCT_TYPE_SUCCESS,
    DELETE_PRODUCT_TYPE_ERROR,
    UPDATE_PRODUCT_TYPE_REQUEST,
    UPDATE_PRODUCT_TYPE_SUCCESS,
    UPDATE_PRODUCT_TYPE_ERROR

} from '../types/types';
import axios from 'axios';

export const addProductType = (data) => (dispatch) => {

    dispatch({ type: POST_PRODUCT_TYPE_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `product-type`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            product_type: data.productType,
            iccid: data.iccid ? data.iccid : false,
            isActive: true,
            description: data.description
        }
    })
        .then((response) => {
            return dispatch({
                type: POST_PRODUCT_TYPE_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_PRODUCT_TYPE_ERROR,
                payload: error.response,
            });
        });
};

export const deleteProductType = (id) => (dispatch) => {
   
    dispatch({ type: DELETE_PRODUCT_TYPE_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `product-type/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_PRODUCT_TYPE_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_PRODUCT_TYPE_ERROR,
                payload: error.response,
            });
        });
};

export const updateProductType = (id,data) => (dispatch) => {

    dispatch({ type: UPDATE_PRODUCT_TYPE_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `product-type/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            product_type: data.productType,
            iccid: data.iccid ? data.iccid : false,
            isActive: true,
            description: data.description
        }
    })
        .then((response) => {
            return dispatch({
                type: UPDATE_PRODUCT_TYPE_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_PRODUCT_TYPE_ERROR,
                payload: error.response,
            });
        });
};

export const productTypeSearch = () => (dispatch) => {
    dispatch({ type: PRODUCT_TYPE_SEARCH_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `product-type`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            
            dispatch({
                type: PRODUCT_TYPE_SEARCH_SUCCESS,
                payload: response.data,
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: PRODUCT_TYPE_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
