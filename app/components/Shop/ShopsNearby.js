import React, { Component } from 'react';
import {Dimensions, Image, TouchableHighlight, ScrollView, Alert } from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input, Spinner } from 'native-base';
import MainHeader from "./../Shared/MainHeader";
import { Actions } from 'react-native-router-flux';
import { categories } from './../../assets/styles';

import { connect } from "react-redux";
import {setProductsList, setVendor} from "../../actions";

import { _e } from '../../lang';
import {base, elements, form} from "../../assets/styles";
import Stars from 'react-native-stars-rating';
import Images from "../../assets/Images";

import * as Progress from 'react-native-progress';
import { get_stores } from './../Root/api.js';
import store from './../../store/configuteStore';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  DefaultAnimation,
} from 'react-native-popup-dialog';
const scaleAnimation = new ScaleAnimation();
const strError = null;

const { width: windowWidth } = Dimensions.get('window');

let lang = 'fa';

class ShopsNearby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrStores: null,
            loaded: true
        };
    }

    componentWillMount() {
        this.setState({ loaded: false });
        this.setState({ count: 1 });

        if(this.props.hasOwnProperty('map_click')){

            navigator.geolocation.getCurrentPosition((position) => {
                get_stores(store.getState().user.userId, store.getState().user.apiToken, position.coords.latitude.toString(), position.coords.longitude.toString(), "supr")
                .then((response) => {
    
                    if (response.status != "success" && response.error) {
    
                        this.scaleAnimationDialog.show();
                        let strError = response.error;
                        this.setState({ loaded: true });
                        return;
                    }
                   
    
                    if(response.data.length < 1){
                        this.setState({ loaded: true , count: 0 ,  arrStores: response.data});
                    }
                    else{
                        this.props.setProductsList({
                            storeList: response.data
                        });
    
                        this.setState({ loaded: true , arrStores: response.data });    
                        
                    }
                    
                    if(this.state.count == 0){
                        setTimeout(function(){
                            Actions.replace('map');
                        } , 2000);
                    }
                    
                });
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });

        }
        else{
            let list = store.getState().productsList;

            //alert(JSON.stringify(list));

            if(list.storeList.length == 0){
                this.setState({ loaded: true , count: 0});
                
                setTimeout(function(){
                    Actions.replace('map');
                } , 2000);

            }
            else
                this.setState({ loaded: true , arrStores: list.storeList});

        }   
    }

    setVendor(store_id, store_title) {
        this.props.setVendor(json.data);
        Actions.push('shop_home', { store_id: store_id, store_title:store_title } );
    }

    render() {
        
        if(this.state.loaded){
            if(this.state.count == 0){
                return (
                    <Container>
                    
                    <MainHeader title={_e[global.lang].stores_nearby}/>
                    <ScrollView> 
                    <View><Text style={{ textAlign: 'center',fontSize: 20, marginTop: 40 }}>no shop around you </Text></View>
                    <View style={base.top20}></View>
                    </ScrollView>
                    
                    </Container>
                )
            }
            else{

                return (
                    <Container>
                    <MainHeader title={_e[global.lang].stores_nearby}/>
                        <ScrollView> 
                            { this.state.arrStores.map((store, index) =>(
                            <View style={elements.roundBox} key={ index }>
                                <View style={categories.hiddenBox}>
                                    <View >
                                        <Stars
                                            isActive={false}
                                            color={'#852c50'}
                                            rateMax={5}
                                            isHalfStarEnabled={true}
                                            rate={store.rate==0?-1:store.rate}
                                            size={15}
                                        />
                                    </View>
                                    <View style={{flex:1, justifyContent:'flex-start'}}>
                                        <Text style={base.boldPrimary}>{ store.title }</Text>
                                    </View>
                                </View>
                                <View style={categories.hiddenBox}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={[base.mediumText, base.headingText]}>{ store.distance.toString() } کیلومتر </Text>
                                    </View>
                                    <View style={{flex:0, justifyContent:'center'}}>
                                        <Text style={[base.mediumText,base.primary]}>{_e[global.lang].distance}:</Text>
                                    </View>
                                    <View style={{flex:0, justifyContent:'center'}}>
                                        <Image source={Images.icoDistance} resizeMode="contain" style={elements.icons}/>
                                    </View>
                                </View>
                                <View style={categories.hiddenBox}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={[base.mediumText, base.headingText]}>{ store.avg_time }</Text>
                                    </View>
                                    <View style={{flex:0, justifyContent:'center'}}>
                                        <Text style={[base.mediumText,base.primary]}>{_e[global.lang].delivery_time}:</Text>
                                    </View>
                                    <View style={{flex:0, justifyContent:'center'}}>
                                        <Image source={Images.icoShipment} resizeMode="contain" style={elements.icons}/>
                                    </View>
                                </View>
                                <View style={categories.hiddenBox}>
                                    <View>
                                        <Text style={[base.mediumText, categories.redColor]}>{(store.open===1)?_e[global.lang].open:_e[global.lang].closed}</Text>
                                    </View>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={[base.mediumText, base.headingText]}>{ store.free_delivery }</Text>
                                    </View>
                                    <View style={{flex:0, justifyContent:'center'}}>
                                        <Text style={[base.mediumText,base.primary]}>{_e[global.lang].free_delivery}:</Text>
                                    </View>
                                    <View style={{flex:0, justifyContent:'center'}}>
                                        <Image source={Images.icoFree} resizeMode="contain" style={elements.icons}/>
                                    </View>
                                </View>
                                <TouchableHighlight underlayColor='rgba(255,255,255,0.1)'  onPress={()=>{this.setVendor(store.store_id, store.title)}}>
                                <View style={{backgroundColor:'#8a3a5a', marginTop:10, borderRadius:5, borderColor:'#e3e3e3', borderWidth:1, alignItems:'center', flex:1, justifyContent:'center'}}>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={base.menuText}>{_e[global.lang].select_store}</Text>
                                    </View>
                                </View>
                                </TouchableHighlight>
                            </View>
                        ))}   
                        <View style={base.top20}></View>
                        </ScrollView>

                            {/* ===== Popup Dialog ===== */}
                            <PopupDialog
                                ref={(popupDialog) => { this.scaleAnimationDialog = popupDialog; }}
                                dialogAnimation={scaleAnimation}
                                width={ 0.8 }
                                height={ 0.3 }
                                overlayPointerEvents='none'
                            >
                                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF0' }}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#852c50', fontSize: 20, marginBottom: 40, paddingLeft: 10, paddingRight: 10 }}>
                                        { "Warnning!\n\n" + strError }
                                    </Text>

                                    <Button full style={[form.submitButton, {marginLeft: 50, marginRight: 50}]} onPress={ () => { this.scaleAnimationDialog.dismiss() }}>
                                        <Text style={form.submitText}> Ok </Text>
                                    </Button>
                                </View>
                            </PopupDialog>
                        </Container>
                )

            }
        }
        else{
            return (
                <Container>
                    <MainHeader title={_e[global.lang].stores_nearby}/>
                        <ScrollView> 
                        <Spinner color={ '#852c50' } />
                        <View style={base.top20}></View>
                        </ScrollView>
                </Container>
            )
        }
    }
}


/*
const mapDispatchToProps = dispatch => {
    return {
        setProductsList : productsList => { dispatch(setProductsList(productsList)) } }
}
*/

const mapDispatchToProps = dispatch => {
    return {
        setVendor : vendor => {
            dispatch(setVendor(vendor))
        }
    }
}

export default connect(null, mapDispatchToProps)(ShopsNearby)
