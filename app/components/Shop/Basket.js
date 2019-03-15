import React from 'react';
import {ScrollView, Dimensions, TouchableOpacity, TouchableHighlight, Image} from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Icon, Input, Item   } from 'native-base';
import SimpleStepper from 'react-native-simple-stepper';
import UserHeader from "../Shared/UserHeader";
import ImageLoad from 'react-native-image-placeholder';
import { base, elements, form } from './../../assets/styles';

// Images
import Images from './../../assets/Images';

const {
    width: windowWidth,
    height: windowHeight
} = Dimensions.get('window');

const imageSize       = windowWidth * 0.4;
const pageTitle = 'سبد خرید';

var data = {
        items_total:'27,500',
        currency:'تومان',
        shipment:'5,000',
        discount:'3,000',
        order_total:'29,500',
        items:[
            {title:'مایع لباسشویی لباس‌های تیره 1 لیتری پرسیل',
            id:218,
            image: 'http://emzi.net/icons/tea.jpg',
            old_price:'8,570',
            new_price:'7,207',
            discount:'16%',
            quantity:2},
            {title:'مایع لباسشویی لباس‌های تیره 1 لیتری پرسیل',
                id:218,
                image: 'http://emzi.net/icons/tea.jpg',
                old_price:'8,570',
                new_price:'7,207',
                discount:'16%',
                quantity:2},
            {title:'مایع لباسشویی لباس‌های تیره 1 لیتری پرسیل',
                id:218,
                image: 'http://emzi.net/icons/tea.jpg',
                old_price:'8,570',
                new_price:'7,207',
                discount:'16%',
                quantity:2,}

        ]
        }
export default class Basket extends React.Component {

    // Render Seller Section
    _renderFooter() {
        return (
            <View style={elements.footer}>
                <View style={elements.footerBoxesLeft}>
                    <TouchableOpacity style={elements.buyButton}>
                        <Text style={elements.buttonText}>تایید سفارش</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _valueChanged(value) {
        // If you want to set the value to a certain decimal point you can like so:
        const displayValue = value.toFixed(2)
        this.setState({
            displayValue: displayValue
        })
        // ...
    }

    render () {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                {this._renderFooter()}
                <Content>
                    <ScrollView>
                        {/*<View style={{flex:1, flexDirection:'column', justifyContent:'flex-start', padding:5, backgroundColor:'white', marginBottom:1 }}>
                            <Text style={base.boldPrimary}>نشانی ارسال سفارش</Text>
                            <View style={{flex:1, padding:5}}>

                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end',marginTop:10}}>
                                    <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-start',}}>
                                        <Icon name="ios-arrow-back-outline" style={{color:'#999',fontSize:20,  marginRight:5, marginTop:3}} />
                                        <Text style={[base.normalText,{justifyContent:'flex-start', textAlign:'left'}]}>انتخاب آدرس</Text>
                                    </View>
                                    <View style={{flex:1, backgroundColor:'white', flexDirection:'column', justifyContent:'flex-start'}}>
                                        <Text style={base.normalText}>ارسال به </Text>
                                    </View>
                                </View>
                            </View>

                        </View>*/}
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', padding:5, backgroundColor:'white', marginBottom:1 }}>
                            <View style={{flex:1, padding:5}}>
                                <Text style={base.boldPrimary}>مایع لباسشویی لباس‌های تیره 1 لیتری پرسیل</Text>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end',marginTop:10}}>
                                    <View  style={{flex:1, flexDirection:'column', justifyContent:'flex-start',}}>
                                        <Text style={[base.mediumText,{textDecorationLine:'line-through', color:'#ccc', justifyContent:'flex-start', textAlign:'left'}]}>15,000 تومان</Text>
                                        <Text style={[base.normalText, {justifyContent:'flex-start', textAlign:'left'}]}>12,000 تومان</Text>
                                    </View>
                                    <View style={{flex:1, backgroundColor:'white', flexDirection:'column', justifyContent:'flex-start'}}>
                                        <Text style={base.tinyText}>وزن: 100 گرم </Text>
                                        <Text style={base.tinyText}>رایحه: سیب </Text>
                                        <Text style={base.tinyText}>تولید: ایران </Text>
                                        <Text style={base.tinyText}>وزن: 100 گرم </Text>
                                        <Text style={base.tinyText}>رایحه: سیب </Text>
                                        <Text style={base.tinyText}>تولید: ایران </Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'row',  justifyContent:'flex-end', marginTop:10}}>

                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <TouchableOpacity>
                                            <Text style={{backgroundColor:'#852c50', borderRadius:3,   padding:3, paddingTop:4, textAlign:'center', borderWidth:1, borderColor:'#e5d2da', margin:3, width:40, marginTop:0 , fontSize:24, color:'#ffffff'}}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={[base.normalText, {backgroundColor:'#f9f4f6', borderRadius:3, padding:3, paddingTop:4, textAlign:'center', borderWidth:1, borderColor:'#e5d2da', margin:3, width:75, marginTop:0 }]}> 2 عدد</Text>
                                        <TouchableOpacity>
                                            <Text style={{backgroundColor:'#852c50', borderRadius:3,   padding:3, paddingTop:4, textAlign:'center', borderWidth:1, borderColor:'#e5d2da', margin:3, width:40, marginTop:0, fontSize:24, color:'#ffffff' }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:imageSize, height:imageSize}} >
                                <ImageLoad
                                    style={{width:imageSize, height:imageSize}}
                                    loadingStyle={{ size: 'large', color: 'gray' }}
                                    source={{uri: 'http://www.shahrvand.ir/upload/product/1519194476.jpg'}}
                                />
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start', padding:5, backgroundColor:'white', marginBottom:1 }}>

                            <View style={{flex:1, padding:5}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end',marginTop:10, marginBottom:10}}>
                                    <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-start', height:40, padding:0, margin:0}}>
                                        <View style={{flexDirection:'column', justifyContent:'center'}}>
                                            <Text style={base.normalText}>اعمال کد </Text>
                                        </View>
                                        <View style={{flex:1, justifyContent:'flex-start',  alignItems:'center' }}>
                                            <Item rounded style={[form.item, {alignItems:'center'}]} >
                                                <Input
                                                placeholder='کد تخفیف'
                                                style={form.input}
                                                maxLength = {11}
                                            />
                                            </Item>
                                        </View>
                                        <View style={{flexDirection:'column', justifyContent:'center'}}>
                                            <Text style={base.normalText}>کد تخفیف دارید؟ </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start', padding:5, backgroundColor:'white' }}>
                            <View style={{flex:1, padding:5}}>

                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end',marginTop:10}}>

                                    <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-start',}}>
                                        <Text style={[base.normalText,{justifyContent:'flex-start', textAlign:'left'}]}>250,000 تومان</Text>
                                    </View>
                                    <View style={{flex:1, backgroundColor:'white', flexDirection:'column', justifyContent:'flex-start'}}>
                                        <Text style={base.normalText}>جمع قیمت مصرف کننده</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end',marginTop:10}}>
                                    <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-start',}}>
                                        <Text style={[base.normalText,{justifyContent:'flex-start', textAlign:'left'}]}>رایگان</Text>
                                    </View>
                                    <View style={{flex:1, backgroundColor:'white', flexDirection:'column', justifyContent:'flex-start'}}>
                                        <Text style={base.normalText}>هزینه ارسال</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end',marginTop:10}}>
                                    <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-start',}}>
                                        <Text style={[base.normalText,{justifyContent:'flex-start', textAlign:'left'}]}>25,000- تومان</Text>
                                    </View>
                                    <View style={{flex:1, backgroundColor:'white', flexDirection:'column', justifyContent:'flex-start'}}>
                                        <Text style={base.normalText}>تخفیف فروشگاه</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end',marginTop:10}}>
                                    <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-start',}}>
                                        <Text style={[base.normalText,{justifyContent:'flex-start', textAlign:'left'}]}>5,000- تومان</Text>
                                    </View>
                                    <View style={{flex:1, backgroundColor:'white', flexDirection:'column', justifyContent:'flex-start'}}>
                                        <Text style={base.normalText}>تخفیف نوروزی</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end',marginTop:10}}>
                                    <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-start',}}>
                                        <Text style={[base.boldPrimary,{justifyContent:'flex-start', textAlign:'left'}]}>220,000 تومان</Text>
                                    </View>
                                    <View style={{flex:1, backgroundColor:'white', flexDirection:'column', justifyContent:'flex-start'}}>
                                        <Text style={base.boldPrimary}>مبلغ قابل پرداخت</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <View style={{height:80, backgroundColor:'#fff'}}></View>
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}
