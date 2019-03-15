import React, { Component } from 'react';
import { categories } from '../../assets/styles/index';

let base_url = "http://asanpakhsh.com/ws";

//***** User *****//
export function user_signup(mobile, device_id, fullname, email, referrer, location_lat, location_lng) {
    return fetch(base_url + '/user/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                mobile: mobile,
                device_id: device_id,
                fullname: fullname,
                email: email,
                referrer: referrer,
                lat: location_lat,
                lng: location_lng
            }
        })
    })
    .then((response) => response.json());
}

//Api to update onesignal token for each user
export function onesignal_token_update(user_id, token, one_player_id, one_player_token) {
    return fetch(base_url + '/user/onesignal_token_update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id: user_id,
                token: token,
                one_player_id: one_player_id,
                one_player_token: one_player_token
            }
        })
    })
    .then((response) => response.json()); 
}
export function confirm_mobile(user_id, token, code) {
    return fetch(base_url + '/user/confirm_mobile', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id: user_id,
                token: token,
                code: code.toString()
            }
        })
    })
    .then((response) => response.json());
}

export function sms_login(mobile, device_id, location_lat, location_lng) {
    return fetch(base_url + '/user/sms_login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                mobile: mobile,
                device_id: device_id,
                lat: location_lat,
                lng: location_lng,
            }
        })
    })
    .then((response) => response.json());
}

export function auto_login(token) {
    return fetch(base_url + '/user/auto_login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                token: token
            }
        })
    })
    .then((response) => response.json());
}

export function get_profile(user_id, token) {
    return fetch(base_url + '/user/get_profile', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id: user_id,
                token: token
            }
        })
    })
    .then((response) => response.json());
}

export function update_profile(user_id, token, fullname, email, birthdate, gender) {
    return fetch(base_url + '/user/update_profile', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id: user_id,
                token: token,
                fullname: fullname,
                email: email,
                birthdate: birthdate,
                gender: gender
            }
        })
    })
    .then((response) => response.json());
}

export function get_address(lat, lng) {
    return fetch(base_url + '/user/get_address', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                lat: lat,
                lng: lng
            }
        })
    })
    .then((response) => response.json());
}

//***** Store *****//
export function get_stores(user_id, token, lat, lng, type) {
    return fetch(base_url + '/store/get_stores', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id: user_id,
                token: token,
                lat: lat,
                lng: lng,
                type: type
            }
        })
    })
    .then((response) => response.json());
}

export function get_store_details(user_id, store_id, token) {
    return fetch(base_url + '/store/get_store_details', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id: user_id,
                store_id: store_id,
                token: token
            }
        })
    })
    .then((response) => response.json());
}

export function store_categories(user_id, store_id, parent, top, token) {
    return fetch(base_url + '/store/store_categories', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id: user_id,
                store_id: store_id,
                parent: parent,
                top: top,
                token: token
            }
        })
    })
    .then((response) => response.json());
}

export function get_products(user_id, token, store_id, category, products, page_size, page_no) {

    return fetch(base_url + '/store/get_products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id: user_id,
                token: token,
                store_id: store_id,
                category: category,
                products: products,
                page_size: page_size,
                page_no: page_no
            }
        })
    })
    .then((response) => response.json());
}

export function add_to_cart(user_id , token , store_id , product_id) {

    //alert(JSON.stringify({data: {user_id:user_id,token:token,store_id:store_id,product_id:product_id}}));

    return fetch(base_url + '/store/add_to_cart', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                user_id:user_id,
                token:token,
                store_id:store_id,
                product_id:product_id
            }
        })
    })
    .then((response) => response.json());
}