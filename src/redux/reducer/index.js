import { combineReducers } from "redux";
import login from "./login/login.reducer";
import getProductType from "./productType/productType.reducer";
import getProductPlan from "./productType/productPlan.reducer";
import getInventory from "./InventoryTrack/allInventory.reducer";
import getInventoryIccid from "./InventoryTrack/inventoryIccid.reducer";
import getInventoryWithoutIccid from "./InventoryTrack/inventoryWithoutIccid.reducer";
import getInventoryNontIccid from "./nonIccidProducts/nonIccidProduct.reducer";

export default combineReducers({
    login,
    getProductType,
    getProductPlan,
    getInventory,
    getInventoryIccid,
    getInventoryWithoutIccid,
    getInventoryNontIccid
});
