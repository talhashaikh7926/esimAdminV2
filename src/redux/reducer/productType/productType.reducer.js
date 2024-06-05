import {
    PRODUCT_TYPE_SEARCH_REQUEST,
    PRODUCT_TYPE_SEARCH_SUCCESS,
    PRODUCT_TYPE_SEARCH_ERROR
} from "../../types/types";
export default function getProductType(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_TYPE_SEARCH_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case PRODUCT_TYPE_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case PRODUCT_TYPE_SEARCH_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        default:
            return state;
    }
}
