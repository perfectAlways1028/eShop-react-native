import {
    SET_LIST
} from "../actionTypes";

const initialState = {
    storeList:[]
}

export default productsList = (state = initialState , action = {}) => {
    switch (action.type) {
        case SET_LIST :
            const { productsList } = action;
            return {
                storeList: productsList.storeList
            }
            break;
        default:
            return state;
    }
}