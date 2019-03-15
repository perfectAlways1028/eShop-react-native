import {
    SET_USER
} from "../actionTypes";

const initialState = {
    userId : null,
    name : null,
    mobile : null,
    email: null,
    apiToken : null
}

export default user = (state = initialState , action = {}) => {
    switch (action.type) {
        case SET_USER :
            const { user } = action;
            return {
                userId: user.userId,
                name : user.name,
                mobile : user.mobile,
                email: user.email,
                apiToken: user.apiToken
            }
            break;
        default:
            return state;
    }
}