import {

    POST_INVENTORY_REQUEST,
    POST_INVENTORY_SUCCESS,
    POST_INVENTORY_ERROR,
    INVENTORY_SEARCH_REQUEST,
    INVENTORY_SEARCH_SUCCESS,
    INVENTORY_SEARCH_ERROR,
    DELETE_INVENTORY_REQUEST,
    DELETE_INVENTORY_SUCCESS,
    DELETE_INVENTORY_ERROR,
    UPDATE_INVENTORY_REQUEST,
    UPDATE_INVENTORY_SUCCESS,
    UPDATE_INVENTORY_ERROR

} from '../types/types';
import axios from 'axios';

export const addInventory = (data) => (dispatch) => {
    dispatch({ type: POST_INVENTORY_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `inventories`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            orderNumber: data.order,
            productTypeId: data.product_type?._id,
            productPlanId: data.product_plan?._id,
            iccid: data.iccid,
            mobileNumber: data.mobile,
            puk: data.pin,
            expiryDate: data.expiry,
            quantity: data.quantity ? Number(data.quantity) : 0,
            comment: data.comment,
            activatedDate: data.activated,
            status: data.status ? data.status : "",
            isActive: true
        }
    })
        .then((response) => {
            return dispatch({
                type: POST_INVENTORY_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_INVENTORY_ERROR,
                payload: error.response,
            });
        });
};

export const deleteInventory = (id) => (dispatch) => {

    dispatch({ type: DELETE_INVENTORY_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `inventories/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_INVENTORY_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_INVENTORY_ERROR,
                payload: error.response,
            });
        });
};

export const updateInventory = (id, data) => (dispatch) => {

    dispatch({ type: UPDATE_INVENTORY_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `inventories/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            orderNumber: data.order,
            productTypeId: data.product_type?._id,
            productPlanId: data.product_plan?._id,
            iccid: data.iccid,
            mobileNumber: data.mobile,
            puk: data.pin,
            expiryDate: data.expiry,
            quantity: data.quantity ? Number(data.quantity) : 0,
            comment: data.comment,
            activatedDate: data.activated,
            status: data.status ? data.status : "",
            isActive: true
        }
    })
        .then((response) => {
            return dispatch({
                type: UPDATE_INVENTORY_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_INVENTORY_ERROR,
                payload: error.response,
            });
        });
};

export const InventorySearch = () => (dispatch) => {
    dispatch({ type: INVENTORY_SEARCH_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `inventories`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
    
            dispatch({
                type: INVENTORY_SEARCH_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: INVENTORY_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
