import React, { Component } from 'react';
import {Image} from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon } from 'native-base';
import { base, categories } from './../../assets/styles';


export default class NotificationBlock extends Component {
    render() {
        const { notification } = this.props;
        return (
            <View key={notification.id} style={{marginTop:10}}>
                <View style={categories.box}>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                        <View style={{flex:1, flexWrap:'wrap'}}>
                            <View style={{flex:1, flexDirection:'column'}}>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View>
                                        <Text style={[categories.billHeadingValue,{flexWrap:'wrap'}]}>{notification.title}</Text>
                                    </View>
                                </View>
                                <View  style={{flex:1, justifyContent:'flex-end',  flexDirection:'row'}}>
                                    <View>
                                        <Text style={[base.mediumText, {flex:1, flexWrap:'wrap'}]}>{notification.description}</Text>
                                    </View>
                                </View>
                                <View  style={{flex:1, justifyContent:'flex-start',  flexDirection:'row'}}>
                                    <View>
                                        <Text style={base.smallText}><Text style={base.smallText}>{notification.send_date} - {notification.send_time}</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{width:100, height:100}}>
                            <Image style={[{height:100, width:100}]} source={{uri:'http://emzi.net/icons/' + notification.icon_name }}  resizeMode="contain" />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}