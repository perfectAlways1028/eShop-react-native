import {
    SET_VENDOR
} from "../actionTypes";

const initialState = {
    vendorId: 0,
    vendorName: '',
    categories:[],
    vendorInfo:{},
    open: "0",
    free_delivery: ""
}

export default vendor = (state = initialState , action = {}) => {
    switch (action.type) {
        case SET_VENDOR :
            const { vendor } = action;
            
            return {
                vendorId: vendor.vendorId,
                vendorName: vendor.vendorName,
                categories: vendor.categories,
                vendorInfo: vendor.vendorInfo,
                open: vendor.open,
                free_delivery: vendor.free_delivery
            }

            break;
            
        default:
            return state;
    }
}