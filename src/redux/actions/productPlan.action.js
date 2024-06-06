import {

    POST_PRODUCT_PLAN_REQUEST,
    POST_PRODUCT_PLAN_SUCCESS,
    POST_PRODUCT_PLAN_ERROR,
    PRODUCT_PLAN_SEARCH_REQUEST,
    PRODUCT_PLAN_SEARCH_SUCCESS,
    PRODUCT_PLAN_SEARCH_ERROR,
    DELETE_PRODUCT_PLAN_REQUEST,
    DELETE_PRODUCT_PLAN_SUCCESS,
    DELETE_PRODUCT_PLAN_ERROR,
    UPDATE_PRODUCT_PLAN_REQUEST,
    UPDATE_PRODUCT_PLAN_SUCCESS,
    UPDATE_PRODUCT_PLAN_ERROR

} from '../types/types';
import axios from 'axios';

export const addProductPlan = (data) => (dispatch) => {
    dispatch({ type: POST_PRODUCT_PLAN_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'POST',
        url: `product-plan`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            productTypeId: data.product_type?._id,
            productPlan: data.productPlan,
            isActive: true,
            description: data.description
        }
    })
        .then((response) => {
            return dispatch({
                type: POST_PRODUCT_PLAN_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: POST_PRODUCT_PLAN_ERROR,
                payload: error.response,
            });
        });
};

export const deleteProductPlan = (id) => (dispatch) => {

    dispatch({ type: DELETE_PRODUCT_PLAN_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'DELETE',
        url: `product-plan/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return dispatch({
                type: DELETE_PRODUCT_PLAN_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: DELETE_PRODUCT_PLAN_ERROR,
                payload: error.response,
            });
        });
};

export const updateProductPlan = (id, data) => (dispatch) => {

    dispatch({ type: UPDATE_PRODUCT_PLAN_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'PUT',
        url: `product-plan/${id}`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: {
            productTypeId: data.product_type?._id,
            productPlan: data.productPlan,
            isActive: true,
            description: data.description
        }
    })
        .then((response) => {
            return dispatch({
                type: UPDATE_PRODUCT_PLAN_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            return dispatch({
                type: UPDATE_PRODUCT_PLAN_ERROR,
                payload: error.response,
            });
        });
};

export const productPlanSearch = () => (dispatch) => {
    dispatch({ type: PRODUCT_PLAN_SEARCH_REQUEST });
    const token = JSON.parse(localStorage.getItem('token'));
    return axios({
        method: 'GET',
        url: `product-plan`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
    
            dispatch({
                type: PRODUCT_PLAN_SEARCH_SUCCESS,
                payload: response.data
            });
            return response.data
        })
        .catch((error) => {
            return dispatch({
                type: PRODUCT_PLAN_SEARCH_ERROR,
                payload: error.response,
            });
        });
}
