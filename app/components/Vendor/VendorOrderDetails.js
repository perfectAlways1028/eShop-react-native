import React, { Component } from 'react';
import {Dimensions, Image, ScrollView , TouchableOpacity} from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';

import UserHeader from './../Shared/UserHeader';

import { base, categories, elements } from './../../assets/styles';

const {
    width: windowWidth
} = Dimensions.get('window');

const tileStyle     = { height: 50+(windowWidth-30) / 2, width: (windowWidth-30) / 2, margin:5};
const imageSize       = (windowWidth-70) / 8;
const pageTitle = 'جزئیات سفارش'
var data = [
    {ord_date:'1396/12/21', ord_time:'18:45', shop:'فروشگاه تارا', id:'205-928', num:'5',total:'118,000', discount:'11,800', discount2:'0', final_price:'106,200', peyk:'0', discount_percent:'10%', tax:'7,800', status:'تحویل شد', status_color:'success', sub_cats:[
        {title:'بستنی وانیلی 100 گرمی سابق', fee1:'25,000', fee2:'18,000', num:'1', total1:'25,000', total2:'18,000'},
        {title:'ماست سون کاله 1 کیلویی', fee1:'20,000', fee2:'18,000', num:'2', total1:'40,000', total2:'36,000'},
        {title:'نوشابه 1.5 لیتری کوکاکولا', fee1:'12,000', fee2:'10,000', num:'1', total1:'24,000', total2:'20,000'},
        {title:'تن ماهی شیلان', fee1:'7,500', fee2:'7,000', num:'2', total1:'15,000', total2:'14,000'},
        {title:'ماست موسیر 150 گرمی رامک', fee1:'6,000', fee2:'6,000', num:'1', total1:'6,000', total2:'6,000'},
    ]},
]

export default class VendorOrderDetails extends Component {

    _renderFooter() {
        const { product } = this.props;
        return (
            <View style={elements.footer}>
                <View style={elements.footerBoxesLeft}>
                    <TouchableOpacity style={elements.buyButton}>
                        <Text style={elements.buttonText}> تحویل پیک شد</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    render() {
        return (
            <Container>
            <UserHeader title={pageTitle}  />
                {this._renderFooter()}
            <ScrollView>
            {Object.keys(data).map((key) => {
                return (
                    <View key={key} style={{marginTop:10}}>
                        <View style={categories.box}>
                            <View style={{flex:1, flexDirection:'column'}}>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View style={[categories.headingBox, {width:'auto', flex:1, justifyContent:'center'}]}>
                                        <Text style={categories.heading}>{data[key].shop}</Text>
                                    </View>
                                </View>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View style={categories.col2}>
                                        <Text style={categories.billHeadingValue}>{data[key].status}</Text>
                                        <Text style={categories.billHeading}>وضعیت:</Text>
                                    </View>
                                    <View style={categories.col2}>
                                        <Text style={categories.billHeadingValue}>{data[key].id}</Text>
                                        <Text style={categories.billHeading}>شماره سفارش:</Text>
                                    </View>
                                </View>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View style={categories.col2}>
                                        <Text style={categories.billHeadingValue}>{data[key].ord_time}</Text>
                                        <Text style={categories.billHeading}>ساعت:</Text>
                                    </View>
                                    <View style={categories.col2}>

                                        <Text style={categories.billHeadingValue}>{data[key].ord_date}</Text>
                                        <Text style={categories.billHeading}>تاریخ:</Text>
                                    </View>
                                </View>
                                <View style={categories.grid}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                        <Text style={[categories.table_header, categories.center_align, categories.col_20]}>جمع کل</Text>
                                        <Text style={[categories.table_header, categories.center_align, categories.col_10]}>تعداد </Text>
                                        <Text style={[categories.table_header, categories.center_align, categories.col_15]}>فی</Text>
                                        <Text style={[categories.table_header, categories.center_align, categories.col_45]}>شرح کالا</Text>
                                        <Text style={[categories.table_header, categories.center_align, categories.col_10]}>#</Text>
                                    </View>
                                    {Object.keys(data[key].sub_cats).map((item)=> {
                                        return (
                                            <View key={item} style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                                <View style={[categories.table_row_none_text , categories.no_border, categories.col_20]} key={key }>
                                                    <Text style={[categories.table_text_del, categories.left_align]}>{data[key].sub_cats[item].total1} </Text>
                                                    <Text style={[categories.table_text, categories.left_align]}>{data[key].sub_cats[item].total2} </Text>
                                                </View>
                                                <Text style={[categories.table_row, categories.center_align, categories.col_10]}>{data[key].sub_cats[item].num}</Text>
                                                <View style={[categories.table_row_none_text ,categories.col_15]} key={key }>
                                                    <Text style={[categories.table_text_del, categories.left_align]}>{data[key].sub_cats[item].fee1} </Text>
                                                    <Text style={[categories.table_text, categories.left_align]}>{data[key].sub_cats[item].fee2} </Text>
                                                </View>
                                                <Text style={[categories.table_row, categories.right_align, categories.col_45 ]} >{data[key].sub_cats[item].title}</Text>
                                                <Text style={[categories.table_row, categories.center_align, categories.col_10]}>{parseInt(item) + 1} </Text>
                                            </View>
                                        )
                                    })}
                                </View>
                                <View style={[categories.grid,{padding:10}]}>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeadingValue}>{data[key].total} تومان </Text>
                                    </View>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeading}>جمع قیمت مصرف کننده:</Text>
                                    </View>
                                </View>
                                    <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                        <View style={categories.col_45}>
                                            <Text style={categories.billHeadingValue}>{data[key].tax} تومان </Text>
                                        </View>
                                        <View style={categories.col_45}>
                                            <Text style={categories.billHeading}>مالیات ارزش افزوده</Text>
                                        </View>
                                    </View>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeadingValue}>{data[key].peyk} تومان </Text>
                                    </View>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeading}>هزینه پیک:</Text>
                                    </View>
                                </View>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeadingValue}>{data[key].discount} تومان </Text>
                                    </View>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeading}>تخفیف فروشگاه:</Text>
                                    </View>
                                </View>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeadingValue}>{data[key].discount2} تومان </Text>
                                    </View>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeading}>کوپن تخفیف:</Text>
                                    </View>
                                </View>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeadingValue}>{data[key].final_price} تومان </Text>
                                    </View>
                                    <View style={categories.col_45}>
                                        <Text style={categories.billHeading}>مبلغ قابل پرداخت:</Text>
                                    </View>
                                </View>
                                </View>
                            </View>
                        </View>
                        <View style={base.top30}></View>
                        <View style={base.top30}></View>
                        <View style={base.top30}></View>
                    </View>
                )
            })}

        </ScrollView>
            </Container>
        );
    }
}