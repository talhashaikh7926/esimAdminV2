import { combineReducers } from "redux";
import login from "./login/login.reducer";
import getProductType from "./productType/productType.reducer";
import getProductPlan from "./productType/productPlan.reducer";

export default combineReducers({
    login,
    getProductType,
    getProductPlan
});
