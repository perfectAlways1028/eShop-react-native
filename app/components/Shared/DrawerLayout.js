import React from 'react';
import {View, Text, Item, Icon} from 'native-base';
import {Image} from "react-native";
import { drawer } from "./../../assets/styles";
import { Actions } from 'react-native-router-flux';
import store from "./../../store/configuteStore";
import { _e } from '../../lang';

// Images
import Images from './../../assets/Images';
let lang = 'en';
let isVendor = 0;
export default class DrawerLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentWillMount() {
        isVendor = store.getState().user.userId;
    }

    _showUserMenu() {
        return (
        <View>
            <View style={{ backgroundColor:'#570f2c'}}>
                <Image source={Images.menuHeader} style={drawer.imageHeader}>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', height:'100%', padding:15}}>
                        <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end'}}>
                            <Text style={drawer.headingTextBold} onPress={() => Actions.push('user_profile')}>{this.state.user.name}</Text>
                            <Text style={drawer.headingTextMedium} onPress={() => Actions.push('user_profile')}>{_e[lang].current_store}: [current_store]</Text>
                            <Text style={[drawer.headingText]} onPress={() => Actions.push('user_profile')}>{_e[lang].view_profile}</Text>
                        </View>
                        <View style={{width:60}}>
                            <Image source={Images.logo} onPress={() => Actions.replace('user_profile')} resizeMode="contain"  style = {{width:60, flex:1, justifyContent: 'center',alignItems: 'center' }} />
                        </View>
                    </View>
                </Image>
            </View>
            <View>
                <Item style={[drawer.item,drawer.selectedItem]} onPress={() => Actions.replace('shop_home')}>
                    <Text style={drawer.itemTitle}>{_e[lang].view_store}</Text>
                    <Icon name="ios-home-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('map')}>
                    <Text style={drawer.itemTitle}>{_e[lang].set_location}</Text>
                    <Icon name="ios-pin-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('shops_nearby')}>
                    <Text style={drawer.itemTitle}>{_e[lang].change_store}</Text>
                    <Icon name="ios-albums-outline" style={drawer.itemIcon}/>
                </Item>
                {/*<Item style={drawer.item} onPress={() => Actions.replace('search')}>
                        <Text style={drawer.itemTitle}>جستجو</Text>
                        <Icon name="ios-search-outline" style={drawer.itemIcon}/>
                    </Item>*/}
                <Item style={drawer.item} onPress={() => Actions.push('notifications')}>
                    <Text style={drawer.itemTitle}>{_e[lang].notifications}</Text>
                    <Icon name="ios-notifications-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('basket')}>
                    <Text style={drawer.itemTitle}>{_e[lang].basket}</Text>
                    <Icon name="ios-cart-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('orders')}>
                    <Text style={drawer.itemTitle}>{_e[lang].orders_history}</Text>
                    <Icon name="ios-list-box-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={[drawer.item, drawer.featuredItem]} onPress={() => Actions.push('rewards')}>
                    <Text style={drawer.itemTitle}>{_e[lang].free_credit}</Text>
                    <Icon name="ios-ribbon-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('home')}>
                    <View style={drawer.newItem}></View>
                    <Text style={drawer.itemTitle} >{_e[lang].special_offers}</Text>
                    <Icon name="ios-megaphone-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('support')}>
                    <Text style={drawer.itemTitle}>{_e[lang].customer_support}</Text>
                    <Icon name="ios-call-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('settings')}>
                    <Text style={drawer.itemTitle}>{_e[lang].settings}</Text>
                    <Icon name="ios-settings-outline" style={drawer.itemIcon}/>
                </Item>
            </View>
        </View>
        )
    }

    _showVendorMenu() {
        return (
        <View >
            <View style={{ backgroundColor:'#570f2c'}}>
                <Image source={Images.menuHeader} style={drawer.imageHeader}>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', height:'100%', padding:15}}>
                        <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end'}}>
                            <Text style={drawer.headingTextBold} onPress={() => Actions.push('user_profile')}> فروشگاه جانبو</Text>
                            <Text style={drawer.headingTextMedium} onPress={() => Actions.push('user_profile')}>{this.state.user.name}</Text>
                            <Text style={[drawer.headingText]} onPress={() => Actions.push('user_profile')}>مشاهده پروفایل</Text>
                        </View>
                        <View style={{width:60}}>
                            <Image source={Images.logo} onPress={() => Actions.replace('user_profile')} resizeMode="contain"  style = {{width:60, flex:1, justifyContent: 'center',alignItems: 'center' }} />
                        </View>
                    </View>
                </Image>
            </View>
            <View>
                <Item style={drawer.item}  onPress={() => Actions.push('vendor_orders', {orderType: 'pending'})}>

                    <Text style={drawer.itemTitle}  >سفارشات جدید</Text>
                    <Icon name="ios-list-box-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('vendor_orders', {orderType: 'cancel'})}>
                    <Text style={drawer.itemTitle} >سفارشات لغو شده</Text>
                    <Icon name="ios-ribbon-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('vendor_orders', {orderType: 'sent'})}>
                    <Text style={drawer.itemTitle} >سفارشات ارسال شده</Text>
                    <Icon name="ios-megaphone-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('vendor_orders', {orderType: 'sent'})}>
                    <View style={drawer.newItem}></View>
                    <Text style={drawer.itemTitle} >کالاهای در حال خرید</Text>
                    <Icon name="ios-megaphone-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('map')}>
                    <Text style={drawer.itemTitle}>تسویه حساب</Text>
                    <Icon name="ios-pin-outline" style={drawer.itemIcon}/>
                </Item>

                <Item style={drawer.item} onPress={() => Actions.push('support')}>
                    <Text style={drawer.itemTitle}>پشتیبانی</Text>
                    <Icon name="ios-call-outline" style={drawer.itemIcon}/>
                </Item>
                <Item style={drawer.item} onPress={() => Actions.push('vendor_settings')}>
                    <Text style={drawer.itemTitle}>تنظیمات</Text>
                    <Icon name="ios-settings-outline" style={drawer.itemIcon}/>
                </Item>
            </View>
        </View>
        )
    }

    _renderIf(condition, content) {
        if (condition) {
            return content;
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={drawer.container}>
                {this._showUserMenu()}
            </View>
        )
    }

}