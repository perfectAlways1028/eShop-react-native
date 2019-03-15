import user from './userReducer';
import productsList from './listReducer';
import vendor from './vendorReducer';

import network from './network';

const rehydrated = (state = false , action) => {
    switch (action.type) {
        case "persist/REHYDRATE" :
            return true;
            break;
        default:
            return state;
    }
}

export default {
    network,
    rehydrated,
    user,
    vendor,
    productsList
};

