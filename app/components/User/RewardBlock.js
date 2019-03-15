import React, { Component } from 'react';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { categories } from './../../assets/styles';


export default class RewardBlock extends Component {
    render() {
        const { reward } = this.props;
        return (
            <View key={reward.id} style={{marginTop:10}}>
                <View style={categories.box}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{reward.details}</Text>
                                <Text style={categories.billHeading}>اعتبار رایگان بابت:</Text>
                            </View>
                        </View>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>

                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{reward.amount} تومان </Text>
                                <Text style={categories.billHeading}>مبلغ:</Text>
                            </View>
                        </View>
                        <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                            <View style={categories.col2}>
                                <Text style={categories.billHeadingValue}>{reward.date}</Text>
                                <Text style={categories.billHeading}>تاریخ:</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}