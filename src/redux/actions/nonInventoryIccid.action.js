import {

    POST_INVENTORY_NON_ICCID_REQUEST,
    POST_INVENTORY_NON_ICCID_SUCCESS,
    POST_INVENTORY_NON_ICCID_ERROR,
    INVENTORY_NON_ICCID_SEARCH_REQUEST,
    INVENTORY_NON_ICCID_SEARCH_SUCCESS,
    INVENTORY_NON_ICCID_SEARCH_ERROR,
    DELETE_INVENTORY_NON_ICCID_REQUEST,
    DELETE_INVENTORY_NON_ICCID_SUCCESS,
    DELETE_INVENTORY_NON_ICCID_ERROR,
    UPDATE_INVENTORY_NON_ICCID_REQUEST,
    UPDATE_INVENTORY_NON_ICCID_SUCCESS,
    UPDATE_INVENTORY_NON_ICCID_ERROR

} from '../types/types';
import axios from 'axios';

export const addInventoryNonIccid = (data) => (dispatch) => {
    dispatch({ type: POST_INVENTORY_NON_ICCID_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `inventories-non-iccid`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            productType: data.productType,
            inward: data.inward,
            description: data.description,
            expiry: data.expiry,
            quantity: data.quantity ? Number(data.quantity) : 0,
            isActive:true
        }
    })
        .then((response) => {
            return dispatch({
                type: POST_INVENTORY_NON_ICCID_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_INVENTORY_NON_ICCID_ERROR,
                payload: error.response,
            });
        });
};

export const deleteInventoryNonIccid = (id) => (dispatch) => {

    dispatch({ type: DELETE_INVENTORY_NON_ICCID_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `inventories-non-iccid/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_INVENTORY_NON_ICCID_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_INVENTORY_NON_ICCID_ERROR,
                payload: error.response,
            });
        });
};

export const updateInventoryNonIccid = (id, data) => (dispatch) => {

    dispatch({ type: UPDATE_INVENTORY_NON_ICCID_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `inventories-non-iccid/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            productType: data.productType,
            inward: data.inward,
            description: data.description,
            expiry: data.expiry,
            quantity: data.quantity ? Number(data.quantity) : 0,
            isActive:true
        }
    })
        .then((response) => {
            return dispatch({
                type: UPDATE_INVENTORY_NON_ICCID_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_INVENTORY_NON_ICCID_ERROR,
                payload: error.response,
            });
        });
};

export const InventorySearchNonIccid = () => (dispatch) => {
    dispatch({ type: INVENTORY_NON_ICCID_SEARCH_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `inventories-iccid`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
    
            dispatch({
                type: INVENTORY_NON_ICCID_SEARCH_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: INVENTORY_NON_ICCID_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
