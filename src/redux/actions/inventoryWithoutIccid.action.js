import {

    POST_INVENTORY_WITHOUT_ICCID_REQUEST,
    POST_INVENTORY_WITHOUT_ICCID_SUCCESS,
    POST_INVENTORY_WITHOUT_ICCID_ERROR,
    INVENTORY_WITHOUT_ICCID_SEARCH_REQUEST,
    INVENTORY_WITHOUT_ICCID_SEARCH_SUCCESS,
    INVENTORY_WITHOUT_ICCID_SEARCH_ERROR,
    DELETE_INVENTORY_WITHOUT_ICCID_REQUEST,
    DELETE_INVENTORY_WITHOUT_ICCID_SUCCESS,
    DELETE_INVENTORY_WITHOUT_ICCID_ERROR,
    UPDATE_INVENTORY_WITHOUT_ICCID_REQUEST,
    UPDATE_INVENTORY_WITHOUT_ICCID_SUCCESS,
    UPDATE_INVENTORY_WITHOUT_ICCID_ERROR

} from '../types/types';
import axios from 'axios';

export const addInventoryWithoutIccid = (data) => (dispatch) => {
    dispatch({ type: POST_INVENTORY_WITHOUT_ICCID_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `inventories-without-iccid`,
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
                type: POST_INVENTORY_WITHOUT_ICCID_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_INVENTORY_WITHOUT_ICCID_ERROR,
                payload: error.response,
            });
        });
};

export const deleteInventoryWithoutIccid = (id) => (dispatch) => {

    dispatch({ type: DELETE_INVENTORY_WITHOUT_ICCID_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `inventories-without-iccid/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_INVENTORY_WITHOUT_ICCID_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_INVENTORY_WITHOUT_ICCID_ERROR,
                payload: error.response,
            });
        });
};

export const updateInventoryWithoutIccid = (id, data) => (dispatch) => {

    dispatch({ type: UPDATE_INVENTORY_WITHOUT_ICCID_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `inventories-without-iccid/${id}`,
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
                type: UPDATE_INVENTORY_WITHOUT_ICCID_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_INVENTORY_WITHOUT_ICCID_ERROR,
                payload: error.response,
            });
        });
};

export const InventorySearchWithoutIccid = () => (dispatch) => {
    dispatch({ type: INVENTORY_WITHOUT_ICCID_SEARCH_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `inventories-without-iccid`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
    
            dispatch({
                type: INVENTORY_WITHOUT_ICCID_SEARCH_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: INVENTORY_WITHOUT_ICCID_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
