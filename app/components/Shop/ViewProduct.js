import React from 'react';
import {ScrollView, Dimensions, TouchableOpacity, Image, processColor} from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Icon , Spinner } from 'native-base';
import MainHeader from "../Shared/MainHeader";
import ImageSlider from 'react-native-image-slider';
import {form, base, elements , loading } from './../../assets/styles';
import { add_to_cart } from './../Root/api.js';

import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    DefaultAnimation,
  } from 'react-native-popup-dialog';
  
const scaleAnimation = new ScaleAnimation();

import * as Progress from 'react-native-progress';

import Stars from 'react-native-stars-rating';

let lang = 'fa';

// Images
import Images from './../../assets/Images';
import {_e} from "../../lang";
const {
    width: windowWidth,
    height: windowHeight
} = Dimensions.get('window');

const imageSize       = windowWidth;

export default class ViewProduct extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentWillMount() {

        this.setState({ loaded: true });

    }

    // Render Title Section
    _renderTitle() {
        const { product } = this.props;

      //  alert(JSON.stringify(product));

        let spec_key_array = Object.keys(product.specifications);
        let spec_value_array = Object.values(product.specifications);
        let index = 0 , uri = 'http://asanpakhsh.com/contents/logos/';

        return (    
            <View style={{backgroundColor:'#fff', marginTop:2}}>
                <View style={{ padding:20, paddingTop:30}}>
                    <Text style={base.largeText}> {product.title}  </Text>
                    <View style={{flex:1, justifyContent:'flex-start', flexDirection:'column'}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1, justifyContent:'flex-start'}}>
                                <Stars
                                    isActive={false}
                                    color={'#852c50'}
                                    rateMax={5}
                                    isHalfStarEnabled={true}
                                    rate={3.85}
                                    size={15}
                                />
                                <Text style={[base.tinyText, {textAlign:'left', color:'#570f2c'}]}>{_e[global.lang].based_on} 22 {_e[global.lang].reviews} </Text>
                            </View>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end', width:60}}>
                               {spec_key_array.map((item)=> {
                                   return (
                                    <Text key={item} style={[base.mediumText, {flex:1, justifyContent:'flex-end'}]}>{spec_key_array[index]}: {spec_value_array[index++]}</Text>
                                    )
                                })}
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1, justifyContent:'flex-start', flexDirection:'column'}}>
                                <Text>{product.brand.title}</Text>
                                <Image style={{height:30, width:30,position:'absolute', padding:10 , marginLeft:200}} source={{uri: uri + product.brand.logo}}  resizeMode="contain"   />
                    </View>

                </View>
            </View>
        );
    }

    _renderDisoucntLabel(value){

        var percent = parseInt(value * 100);

        return (
            <View style={elements.discountLabelLarge}>
                <Text style={elements.discountLabelFontLarge}>{percent}%</Text>
                <Text style={elements.discountLabelSmallFont}>{value} {_e[global.lang].currency} </Text>
                <Text style={elements.discountLabelSmallFontLarge}>{_e[global.lang].discount}</Text>
            </View>
        )
    }

    // Render Cheaper Price Section
    _renderCheaperPrice() {
        const { product } = this.props;
        return (
            <View style={elements.wrap}>
                <View style={elements.box}>
                    <Text style={elements.boxTitle}>{_e[global.lang].compare_price}</Text>
                    <View style={{flex:1, flexDirection:'row', marginTop:10 }}>
                        <View style={{flex:1, justifyContent:'flex-start'}}>
                            <Text style={[elements.smallText]}>{_e[global.lang].compare_price_description}</Text>
                        </View>
                        <View style={{width:6, backgroundColor:'#ddd', borderRadius:6, marginLeft:5}}></View>
                    </View>

                    {Object.keys(product.price_compare).map((item)=> {
                        return (
                            <View key={item} style={{flex:1, flexDirection:'row', marginTop:10}}>
                                <View style={{flex:1, justifyContent:'flex-start', flexDirection:'column'}}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1, justifyContent:'flex-start'}}>
                                            <Text style={[base.mediumText,{textAlign:'left'}]}>{product.price_compare[item].price} {product.currency}</Text>
                                        </View>
                                        <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end', width:60}}>
                                            <Text style={[elements.normalBoldText, {flex:1, justifyContent:'flex-end'}]}>{product.price_compare[item].title}</Text>
                                            <Text style={[base.smallText, {flex:1, justifyContent:'flex-end'}]}>{product.price_compare[item].address}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:1, flexDirection:'row',  justifyContent:'flex-end'}}>
                                        <Image source={Images.stars35} resizeMode={'cover'} style={{height:13, width:60,}}/>
                                    </View>
                                </View>
                                <View style={{width:6, backgroundColor:'rgba(133,44,80,0.5)', borderRadius:6, marginLeft:5}}></View>
                            </View>
                        )
                    })}

                </View>
            </View>
        );
    }

    // Render Reviews Section
    _renderReviews() {
        const { product } = this.props;
        return (
            <View style={elements.wrap}>
                <View style={elements.box}>
                    <Text style={elements.boxTitle}>{_e[global.lang].customer_reviews}</Text>

                    {Object.keys(product.store_reviews).map((item)=> {
                        return (
                            <View key={'rev-' + item} style={{flex:1, flexDirection:'row', marginTop:10 }}>
                                <View style={{flex:1, justifyContent:'flex-start'}}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1, justifyContent:'flex-start'}}>
                                            <Stars
                                                isActive={false}
                                                color={'#852c50'}
                                                rateMax={5}
                                                isHalfStarEnabled={true}
                                                rate={3.85}
                                                size={15}
                                            />
                                        </View>
                                        <View style={{flex:1, justifyContent:'flex-end'}}>
                                            <Text style={[elements.normalBoldText, {flex:1, justifyContent:'flex-end'}]}>{product.store_reviews[item].name}</Text>
                                        </View>
                                    </View>
                                    <Text style={[base.smallText]}>{product.store_reviews[item].date}</Text>
                                    <Text style={[elements.normalText]}>{product.store_reviews[item].review}</Text>
                                </View>
                                <View style={{width:6, backgroundColor:'rgba(133,44,80,0.5)', borderRadius:6, marginLeft:5}}></View>
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    }

    // Render Seller Section
    _renderSeller() {
        const { product } = this.props;
        return (
            <View style={elements.wrap}>
                <View style={elements.box}>
                    <Text style={elements.boxTitle}>{_e[global.lang].about_seller}</Text>
                    <View style={{flex:1, flexDirection:'row', marginTop:10 }}>
                        <View style={{flex:1, justifyContent:'flex-start'}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:1, justifyContent:'flex-start'}}>
                                    <Stars
                                        isActive={false}
                                        color={'#852c50'}
                                        rateMax={5}
                                        isHalfStarEnabled={true}
                                        rate={3.85}
                                        size={15}
                                    />
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end'}}>
                                    <Text style={[elements.normalBoldText, {flex:1, justifyContent:'flex-end'}]}>{product.vendor.title}</Text>
                                </View>
                            </View>
                            <Text style={[base.smallText]}>{product.vendor.review_summary}</Text>

                        </View>
                        <View style={{width:6, backgroundColor:'#ddd', borderRadius:6, marginLeft:5}}></View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', marginTop:10 }}>
                        <View style={{flex:1, justifyContent:'flex-end'}}>
                            <Text style={[elements.normalBoldText, {flex:1, justifyContent:'flex-end'}]}>{product.vendor.open===0?_e[global.lang].shop_is_closed:_e[global.lang].shop_is_open}</Text>
                        </View>
                        <View style={{width:6, backgroundColor:'rgba(133,44,80,0.5)', borderRadius:6, marginLeft:5}}></View>
                    </View>
                </View>
            </View>
        );
    }

    _renderDescription() {
        const { product } = this.props;
        if (product.description === '') {
            return null;
        } else {
            return (
                <View style={elements.wrap}>
                    <View style={elements.box}>
                        <Text style={elements.boxTitle}>{_e[global.lang].description}</Text>
                        <View style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'flex-end'}}>
                            <Text style={[elements.normalText]}>{product.description}</Text>
                            <View style={{width:6, backgroundColor:'rgba(133,44,80,0.5)', borderRadius:6, marginLeft:5}}></View>
                        </View>
                    </View>
                </View>
            );
        }

    }

    _renderAddtoCard() {
        return (
            <View style={{position:'absolute', top:0, backgroundColor:'transparent', width:windowWidth, height:windowHeight, zIndex:1000, flex:1, flexDirection:'row',  justifyContent:'center', alignItems:'center' }}>
                <View style={{backgroundColor:'rgba(133,44,80,0.8)', width:180, height:180, borderRadius:100, borderWidth:7, borderColor:'#570f2c', zIndex:1000, padding:0}}>
                    <Icon name="md-checkmark" style={{fontSize: 180, color:'#fff', marginLeft:15}}/>
                </View>
            </View>
        );
    }

    _renderShipment() {
        const { product } = this.props;

        if(product.vendor.hasOwnProperty("shipment_info")){
            return (
                <View style={elements.wrap}>
                    <View style={elements.box}>
                        <Text style={elements.boxTitle}>{_e[global.lang].shipment_info}</Text>
                        {Object.keys(product.vendor.shipment_info).map((item)=> {
                            return (
                                <View key={item} style={{flex:1, flexDirection:'row', marginTop:10, justifyContent:'flex-end'}}>
                                    <Text style={[elements.normalText]}>
                                        {product.vendor.shipment_info[item]}
                                    </Text>
                                    <View style={{width:6, backgroundColor:'#ddd', borderRadius:6, marginLeft:5}}></View>
                                </View>
                            )
                            })}
                    </View>
                </View>
            );
        }
        
    }

    //Add to cart
    add_to_cart() {        

        this.setState({ loaded: false });        

        const { user_id , token , store_id , product_id } = this.props;

        add_to_cart(user_id , token , store_id , product_id)
        .then((response) => {

            

            if (response.status != "success" && response.error) {
                console.log(response.error);
                return;
            }

            this.setState({ loaded: true });        

            let strError = "Add to cart successfully.";
            this.scaleAnimationDialog.show();

            

        });

    }    

    // Render Seller Section
    _renderFooter() {
        const { product } = this.props;
        if(product.price_old != product.price_new){
            return (
                <View style={elements.footer}>
                    <View style={elements.footerBoxesLeft}>
                    { this.state.loaded ? 
                            <TouchableOpacity style={elements.buyButton} onPress={()=>this.add_to_cart()} >
                            <Text style={elements.buttonText}>{_e[global.lang].buy}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={elements.buyButton} onPress={()=>this.add_to_cart()} >
                            <Text style={elements.buttonText}>{_e[global.lang].buy}</Text>
                            </TouchableOpacity>
                    }
                        
                    </View>
                    <View style={elements.footerBoxesRight}>
                        <Text style={[elements.footerOldPrice , {textAlign:'right'}]}>{product.price_old} {product.currency} </Text>
                        <Text style={[elements.footerNewPrice , {textAlign:'right'}]}>{product.price_new} {product.currency} </Text>
                    </View>
                </View>
            );
        }
        else{
            return (
                <View style={elements.footer}>
                    <View style={elements.footerBoxesLeft}>
                    { this.state.loaded ? 
                            <TouchableOpacity style={elements.buyButton} onPress={()=>this.add_to_cart()} >
                            <Text style={elements.buttonText}>{_e[global.lang].buy}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={elements.buyButton} onPress={()=>this.add_to_cart()} >
                            <Text style={elements.buttonText}>{_e[global.lang].buy}</Text>
                            </TouchableOpacity>
                    }
                        
                    </View>
                    <View style={elements.footerBoxesRight}>
                        <Text style={[elements.footerNewPrice , {textAlign:'right'}]}>{product.price_new} {product.currency} </Text>
                    </View>
                </View>
            );
        }
        
    }

    render () {
        const { product } = this.props;

        console.log(product);
        if(this.state.loaded){
            return (
                <Container>
                    <MainHeader title={_e[global.lang].view_product}/>
                    {this._renderFooter()}
                    { product.discount > 0 ? this._renderDisoucntLabel(product.discount) : null }
                    <Content>
                        <ScrollView>
                            <View >
                                <ImageSlider height={imageSize} style={{width:imageSize, height:imageSize, backgroundColor:'#fff'}} images={product.images}/>
                                <View style={{position:'absolute', width:imageSize,  height:48, top:imageSize-24, zIndex:5  }}>
                                    <View style={{backgroundColor:'#fff', position:'absolute', padding:10 , width:48, height:48, zIndex:2, top:0, left:30, borderWidth:1, borderRadius:50, borderColor:'#969696' }}>
                                        <TouchableOpacity >
                                            <Icon name="md-heart-outline" style={{fontSize: 30, color:'#852c50'}}/>
                                        </TouchableOpacity >
                                    </View>
                                </View>
                                {this._renderTitle()}
                                {this._renderCheaperPrice()}
                                {this._renderReviews()}
                                {this._renderSeller()}
                                {this._renderDescription()}
                                {this._renderShipment()}
                                <View style={{height:80, backgroundColor:'#fff'}}></View>
                            </View>
                        </ScrollView>
                    </Content>
                    <PopupDialog
                        ref={(popupDialog) => { this.scaleAnimationDialog = popupDialog; }}
                        dialogAnimation={scaleAnimation}
                        width={ 0.8 }
                        height={ 0.3 }
                        overlayPointerEvents='none'
                    >
                        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF0' }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#852c50', fontSize: 20, marginBottom: 40, paddingLeft: 10, paddingRight: 10 }}>
                                { "Success!\n\n" + "Add cart" }
                            </Text>
    
                            <Button full style={[form.submitButton, {marginLeft: 50, marginRight: 50}]} onPress={ () => { this.scaleAnimationDialog.dismiss() }}>
                                <Text style={form.submitText}> Ok </Text>
                            </Button>
                        </View>
                    </PopupDialog>
                </Container>
            )
        }
        else{
            return (
                <Container>
                    <MainHeader title={_e[global.lang].view_product}/>
                    {this._renderFooter()}
                    <Content>
                        <ScrollView>
                            <View >
                                <Spinner color={ '#852c50' } />
                            </View>
                        </ScrollView>
                    </Content>
                    <PopupDialog
                        ref={(popupDialog) => { this.scaleAnimationDialog = popupDialog; }}
                        dialogAnimation={scaleAnimation}
                        width={ 0.8 }
                        height={ 0.3 }
                        overlayPointerEvents='none'
                    >
                        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF0' }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#852c50', fontSize: 20, marginBottom: 40, paddingLeft: 10, paddingRight: 10 }}>
                                { "Success!\n\n" + "Add cart" }
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
}
