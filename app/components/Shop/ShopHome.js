import React, { Component } from 'react';
import {Dimensions, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Container , View , Text, Spinner } from 'native-base';
import MainHeader from "./../Shared/MainHeader";
import { Actions } from 'react-native-router-flux';
import { categories, form } from './../../assets/styles';
import { _e } from '../../lang';
import {base, elements} from "../../assets/styles";
import Images from "../../assets/Images";
import Stars from 'react-native-stars-rating';
import { connect } from "react-redux";
import { setVendor } from "../../actions";
import store from './../../store/configuteStore';
import { get_store_details } from './../Root/api.js';

const {
    width: windowWidth
} = Dimensions.get('window');

class ShopHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: null,
            loaded: true
        };
    }
    
    componentWillMount() {
        let vendor = store.getState().vendor;

        this.setState({ loaded: false });
        
        if(vendor.vendorId != 0){
            this.setState({ storeData: vendor.vendorInfo , loaded: true });
        } else {

            get_store_details(store.getState().user.userId, this.props.store_id, store.getState().user.apiToken)
            .then((response) => {
                if (response.status != "success" && response.error) {
                    this.setState({ loaded: true });
                    return;
                }

                this.setState({ storeData: response.data , loaded: true });
            });
        }
    }

    render() {

        let open = this.props.hasOwnProperty('open') ? this.props : store.getState().vendor.open;
        let store_id = this.props.hasOwnProperty('store_id') ? this.props.store_id : store.getState().vendor.vendorId;
        let free_delivery = this.props.hasOwnProperty('free_delivery') ? this.props.free_delivery : store.getState().vendor.free_delivery;
        let uri = 'http://asanpakhsh.com/contents/banners/' + store_id.toString() + '.png'

        return (
            <Container>
                <MainHeader title={_e[lang].store_details}/>
                <View>
                    <Image source={{uri: uri}} style={categories.adBox} resizeMode="contain" />
                </View>
                <ScrollView>
                    { this.state.loaded ?
                        <View style={elements.roundBox}>
                            <View style={categories.hiddenBox}>
                                <View>
                                    <Stars
                                        isActive={false}
                                        color={'#852c50'}
                                        rateMax={5}
                                        isHalfStarEnabled={true}
                                        rate={3.85}
                                        size={15}
                                    />
                                </View>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={base.boldPrimary}>{ this.state.storeData.title }</Text>
                                </View>
                            </View>
                            <View style={categories.hiddenBox}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={[base.mediumText, base.headingText, { textAlign: 'left' }]}>{ this.state.storeData.address }</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Text style={[base.mediumText,base.primary]}>{_e[lang].store_address}:</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Image source={Images.icoPin} resizeMode="contain" style={elements.icons}/>
                                </View>
                            </View>
                            <View style={categories.hiddenBox}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={[base.mediumText, base.headingText, { textAlign: 'left' }]}>{ this.state.storeData.working_hours }</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Text style={[base.mediumText,base.primary]}>{_e[lang].working_hours}:</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Image source={Images.icoClock} resizeMode="contain" style={elements.icons}/>
                                </View>
                            </View>
                            <View style={categories.hiddenBox}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={[base.mediumText, base.headingText, { textAlign: 'left' }]}>{ this.state.storeData.cover_info }</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Text style={[base.mediumText,base.primary]}>{_e[lang].distance}:</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Image source={Images.icoDistance} resizeMode="contain" style={elements.icons}/>
                                </View>
                            </View>
                            <View style={categories.hiddenBox}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={[base.mediumText, base.headingText, { textAlign: 'left' }]}>{ this.state.storeData.delivery_time }</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Text style={[base.mediumText,base.primary]}>{_e[lang].delivery_time}:</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Image source={Images.icoShipment} resizeMode="contain" style={elements.icons}/>
                                </View>
                            </View>
                            <View style={categories.hiddenBox}>
                                <View>
                                    <Text style={[base.mediumText, categories.redColor]}>{(open===1)?_e[lang].open:_e[lang].closed}</Text>
                                </View>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={[base.mediumText, base.headingText, { textAlign: 'left' }]}>{ free_delivery }</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Text style={[base.mediumText,base.primary]}>{_e[lang].free_delivery}:</Text>
                                </View>
                                <View style={{flex:0, justifyContent:'center'}}>
                                    <Image source={Images.icoFree} resizeMode="contain" style={elements.icons}/>
                                </View>
                            </View>
                            <TouchableOpacity onPress = {() => Actions.push('home', { store_id: store_id })}>
                            <View style={{backgroundColor:'#f1f1f1', marginTop:10, borderRadius:5, borderColor:'#e3e3e3', borderWidth:1, padding:10, alignItems:'center', flex:1, justifyContent:'center'}}>
                                <View style={categories.hiddenBox}>
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={base.normalText}>{_e[lang].view_store_products}</Text>
                                </View>

                                <Image source={{uri:'http://www.asanpakhsh.com/uploads/icons/products.png'}} style={categories.buttonImage} resizeMode="contain" />
                                </View>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() => Actions.push('categories', { store_id: store_id })}>
                                <View style={{backgroundColor:'#f1f1f1', marginTop:10, borderRadius:5, borderColor:'#e3e3e3', borderWidth:1, padding:10, alignItems:'center', flex:1, justifyContent:'center'}}>
                                    <View style={categories.hiddenBox}>
                                        <View style={{flex:1, justifyContent:'center'}}>
                                            <Text style={base.normalText}>{_e[lang].view_categories}</Text>
                                        </View>
                                        <Image source={{uri:'http://www.asanpakhsh.com/uploads/icons/rack.png'}} style={categories.buttonImage} resizeMode="contain" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() => Actions.push('home', { store_id: store_id })}>
                                <View style={{backgroundColor:'#f1f1f1', marginTop:10, borderRadius:5, borderColor:'#e3e3e3', borderWidth:1, padding:10, alignItems:'center', flex:1, justifyContent:'center'}}>
                                    <View style={categories.hiddenBox}>
                                        <View style={{flex:1, justifyContent:'center'}}>
                                            <Text style={base.normalText}>{_e[lang].view_offers}</Text>
                                        </View>
                                        <Image source={{uri:'http://www.asanpakhsh.com/uploads/icons/sale.png'}} style={categories.buttonImage} resizeMode="contain" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    :
                        <Spinner color={ '#852c50' } />
                    }
                </ScrollView>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { setVendor : vendor => { dispatch(setVendor(vendor)) } }
}

export default connect(null, mapDispatchToProps)(ShopHome)
