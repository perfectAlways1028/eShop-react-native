import {
    SET_IS_CONNECTED
} from "../actionTypes";

const initialState = {
    isConnected: true
};

const network = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_CONNECTED:
            return {
                isConnected: action.isConnected
            };
        default:
            return state;
    }
}

export default network;