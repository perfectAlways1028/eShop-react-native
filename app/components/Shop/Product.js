import React, { Component } from 'react';
import {connect} from "react-redux";
import {Dimensions, Image, TouchableHighlight , Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {setActiveProduct} from  "./../../actions";
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { form, base, elements } from './../../assets/styles';
import { add_to_cart } from './../Root/api.js';
import DoubleClick from 'react-native-double-click';
import ImageLoad from 'react-native-image-placeholder';

const {
    width: windowWidth
} = Dimensions.get('window');
const product_url = 'http://www.asanpakhsh.com/uploads/products/xhd/';
const scale =  windowWidth / 360;
var tileStyle = 0;
var tileSize = 0;
var double = 0;

if (scale > 2) {
    tileStyle     = { height: 50+(windowWidth-40) / 3, width: (windowWidth-40) / 3, margin:5};
    tileSize       = (windowWidth-40) / 3;
} else {
    tileStyle     = { height: 50+(windowWidth-30) / 2, width: (windowWidth-30) / 2, margin:5};
    tileSize       = (windowWidth-30) / 2;
}

export default class Product extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.lastPress = 0;
    }

    showDisoucntLabel(percent){
        return (
            <View style={elements.discountLabel}>
                <Text style={elements.discountLabelFont}>{percent}%</Text>
                <Text style={elements.discountLabelSmallFont}>تخفیف</Text>
            </View>
        )
    }
    showOldPrice(price){
        return (
            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                <Text style={[base.tinyText,{flex:1,  flexDirection:'row', paddingTop:5 ,  justifyContent:'flex-end'}]}>تومان</Text>
                <Text style={[base.normalText,{flex:2,  flexDirection:'row', textDecorationLine:'line-through', color:'#ccc', justifyContent:'flex-start'}]}>{price}</Text>
            </View>
        )
    }

    showNewPrice(price){
        return (
            <View style = {{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                <Text style={[base.tinyText,{flex:1,  flexDirection:'row', paddingTop:5 , width:15, justifyContent:'flex-end'}]}>تومان</Text>
                <Text style={[base.normalText,{flex:2, flexDirection:'row', justifyContent:'flex-start'}]}>{price}</Text>
            </View>
        )
    }

    render() {




        const { product , userid , token } = this.props;
        
        

        let uri = "http://asanpakhsh.com/contents/products/xhd/";

        return (
            <TouchableHighlight onPress={()=>this.setProduct(product.id , userid , token , product.store_id)} underlayColor={'#f0f0f0'}>
            <View style={[tileStyle,{backgroundColor:'#fff'}]} >
                {product.discount > 0 ? this.showDisoucntLabel(parseInt(product.discount * 100)) : null }
                <ImageLoad
                    style={{height:tileSize, width:tileSize}}
                    loadingStyle={{ size: 'large', color: 'gray' }}
                    source={{uri: uri + product.image + '.jpg'}}
                />
                <View>
                    <Text numberOfLines={1} style={[base.mediumSmallerText,{paddingLeft:10, paddingRight:10}]}>{product.title}</Text>
                </View>
                <View style = {{flex:1, flexDirection:'row',  justifyContent:'flex-start'}}>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', width: tileSize * 0.5}}>
                        {product.price_new ? this.showNewPrice(product.price_new.toString()) : null }
                    </View>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', width: tileSize * 0.5}}>
                        {product.price_old != product.price_new ? this.showOldPrice(product.price_old.toString()) : null }
                    </View>
                </View>
            </View>
            </TouchableHighlight>
        );
    }

    /*setProduct(id) {

        this.fetchProduct({
            item_type : 'prd',
            item_id : id
        }).done()

    }

    async fetchProduct(params) {

        try {
            let { item_type, item_id } = params;
            let response = await fetch('http://asanpakhsh.com/api/fetch', {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    item_id,
                    item_type
                })
            });

            if(response.status === 200) {
                let json = await response.json();
                Actions.push('product',  {product: json.data})
            }

            if(response.status === 422) {
                // Validate
                console.log('validate');
            }

            if(response.status === 302) {
                // Auth
                console.log('home')
            }

        } catch(error) {
            //console.log(error)
        }
    }*/
    
    setProduct(id , userid ,token, store_id) {        

        var delta = new Date().getTime() - this.lastPress;
        
        this.lastPress = new Date().getTime();

        this.double = 0;

        if(delta < 400){
            
            this.double = 1;

            add_to_cart(userid , token , store_id , id)
            .then((response) => {

                if (response.status != "success" && response.error) {
                    console.log(response.error);
                    return;
                }

                alert('Add product to cart successfully');                    
            });

        }   
        else{
            if(this.double == 0){
                this.fetchProduct({
                    id:id,
                    userid:userid,
                    token:token,
                    store_id:store_id
                }).done()
            }    
        }
    }

    
    async fetchProduct(params) {

        try {
            let { id, userid , token , store_id } = params;

            let response = await fetch('http://asanpakhsh.com/ws/store/get_product', {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    data: {
                        user_id: userid,
                        token: token,
                        store_id:store_id,
                        product_id: id
                    }
                })
            });

            if(response.status === 200) {
                let json = await response.json();
                var i;
                if(json.data.price_compare.length > 2){
                    while(1){
                        if(json.data.price_compare.length == 2)
                            break;
                        json.data.price_compare.splice(2 , 1);
                    }
                }
                let uri = "http://asanpakhsh.com/contents/products/xxhd/";
                
                for(i = 0; i < json.data.images.length; i ++){
                    json.data.images[i] = uri + json.data.images[i] + '.jpg';   
                }

                
                if(this.double != 1){
                    Actions.push('product',  {product: json.data , user_id:userid , token:token , store_id:store_id , product_id:id});
                }
                
            }

            if(response.status === 422) {
                // Validate
                console.log('validate');
            }

            if(response.status === 302) {
                // Auth
                console.log('home')
            }

        } catch(error) {
            //console.log(error)
        }
    }

}


/*const mapDispatchToProps = dispatch => {
    return {
        setActiveProduct : product => {
            dispatch(setActiveProduct(product))
        }
    }
}

export default connect(null,mapDispatchToProps)(Product)*/