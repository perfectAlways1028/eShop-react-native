import React, { Component } from 'react';
import {Dimensions, Image } from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { categories } from './../../assets/styles';

export default class TransactionBlock extends Component {
    render() {
        const { transaction } = this.props;
        return (
            <View key={transaction.id} style={{marginTop:10}}>
                <View style={categories.box}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{transaction.details}</Text>
                                <Text style={categories.billHeading}>شرح:</Text>
                            </View>
                        </View>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{transaction.balance} </Text>
                                <Text style={categories.billHeading}>موجودی:</Text>
                            </View>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{transaction.amount} </Text>
                                <Text style={categories.billHeading}>مبلغ:</Text>
                            </View>
                        </View>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{transaction.time}</Text>
                                <Text style={categories.billHeading}>ساعت:</Text>
                            </View>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{transaction.date}</Text>
                                <Text style={categories.billHeading}>تاریخ:</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}