import {
    PRODUCT_PLAN_SEARCH_REQUEST,
    PRODUCT_PLAN_SEARCH_SUCCESS,
    PRODUCT_PLAN_SEARCH_ERROR
} from "../../types/types";
export default function getProductPlan(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_PLAN_SEARCH_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case PRODUCT_PLAN_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case PRODUCT_PLAN_SEARCH_ERROR:
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
