import React, { Component } from 'react';
import {Dimensions, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { categories, elements, base } from './../../assets/styles';

const {
    width: windowWidth
} = Dimensions.get('window');
const imageSize       = (windowWidth-70)/4;

export default class VendorLiveOrderBlock extends Component {
    render() {
        const { order } = this.props;
        return (
            <View style={{marginTop:10}}>
                <View style={categories.box}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={[categories.col2,{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'column'}]}>
                                <Button full style={elements.buyButton}>
                                    <Text style={elements.buttonText}>ناموجود</Text>
                                </Button>
                            </View>
                            <View style={[categories.col2,{flex:2}]}>
                                <View style={{flex:2, flexDirection:'column'}}>
                                    <Text style={categories.billHeading}>عنوان کالا در اینجا</Text>
                                    <Text style={base.mediumText}>تعداد: 1</Text>
                                </View>
                            </View>
                            <View style={[categories.col2,{flex:1}]}>
                                <View style={{width:imageSize, height:imageSize}} >
                                    <Image source={{uri:'http://www.shahrvand.ir/upload/product/1510554813.jpg'}} resizeMode="contain"  style = {{flex:1, width:imageSize, justifyContent: 'center',alignItems: 'center' }}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


        );
    }
}