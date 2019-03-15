import React, { Component } from 'react';
import {Dimensions, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { categories } from './../../assets/styles';

const {
    width: windowWidth
} = Dimensions.get('window');
const imageSize       = (windowWidth-70) / 8;

export default class VendorOrderBlock extends Component {
    render() {
        const { order } = this.props;
        return (
            <View style={{marginTop:10}} >
                <TouchableOpacity onPress={()=>Actions.push('vendor_order', {order_no:122})}>
                <View style={categories.box}>

                    <View style={{flex:1, flexDirection:'column'}}>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={[categories.headingBox, {width:'auto', flex:1,  justifyContent:'flex-end'}]}>
                                <Text style={categories.billHeadingValue}> 00:15:25</Text>
                                <Text style={categories.billHeading}>زمان سپری شده از سفارش: </Text>
                            </View>
                        </View>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{order.status}</Text>
                                <Text style={categories.billHeading}>وضعیت:</Text>
                            </View>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{order.code}</Text>
                                <Text style={categories.billHeading}>شماره سفارش:</Text>
                            </View>
                        </View>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{order.ord_time}</Text>
                                <Text style={categories.billHeading}>ساعت:</Text>
                            </View>
                            <View style={categories.col2}>

                                <Text style={categories.billHeadingValue}>{order.ord_date}</Text>
                                <Text style={categories.billHeading}>تاریخ:</Text>
                            </View>
                        </View>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{order.items}</Text>
                                <Text style={categories.billHeading}>تعداد اقلام:</Text>
                            </View>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{order.total_price_new} تومان </Text>
                                <Text style={categories.billHeading}>مبلغ:</Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                            <View>
                                <Image style={[categories.icon, {height:imageSize, width:imageSize}]} source={{uri:'http://emzi.net/icons/dots.jpg'}}  resizeMode="contain" />
                            </View>
                          {Object.keys(order.icons).map((key)=> {
                                return (
                                    <View key={key}>
                                        <Image style={[categories.icon, {height:imageSize, width:imageSize}]} source={{uri:'http://emzi.net/icons/'+order.icons[key]}}  resizeMode="contain" />
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                </View>
                </TouchableOpacity>
            </View>


        );
    }
}