import {
    INVENTORY_ICCID_SEARCH_REQUEST,
    INVENTORY_ICCID_SEARCH_SUCCESS,
    INVENTORY_ICCID_SEARCH_ERROR
} from "../../types/types";
export default function getInventoryIccid(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case INVENTORY_ICCID_SEARCH_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case INVENTORY_ICCID_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case INVENTORY_ICCID_SEARCH_ERROR:
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
