import {
    SET_USER,
    SET_LIST,
    SET_VENDOR,
} from "./../actionTypes";

export const setUser = (user) => ({
    type : SET_USER,
    user : user
});

export const setVendor = (vendor) => ({
    type : SET_VENDOR,
    vendor : vendor
});

export const setProductsList = (productsList) => ({
    type : SET_LIST,
    productsList : productsList
});
