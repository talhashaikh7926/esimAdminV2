import {
    INVENTORY_WITHOUT_ICCID_SEARCH_REQUEST,
    INVENTORY_WITHOUT_ICCID_SEARCH_SUCCESS,
    INVENTORY_WITHOUT_ICCID_SEARCH_ERROR
} from "../../types/types";
export default function getInventoryWithoutIccid(state = "", action) {
    const { type, payload } = action;
    switch (type) {
        case INVENTORY_WITHOUT_ICCID_SEARCH_REQUEST:
            return {
                loading: true,
                success: true,
            };
        case INVENTORY_WITHOUT_ICCID_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                payload: payload,
            };

        case INVENTORY_WITHOUT_ICCID_SEARCH_ERROR:
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
