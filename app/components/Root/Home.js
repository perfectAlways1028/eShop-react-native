import React from 'react';
import { Alert } from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input,Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MainHeader from "./../Shared/MainHeader";
import ProductTabs from './../Shop/ProductTabs';
import store from "./../../store/configuteStore";
import { _e } from '../../lang';
import { store_categories } from './../Root/api.js';

import { connect } from "react-redux";
import { setVendor } from "../../actions";

let pageTitle = 'آسان پخش';
let lang='en';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        let vendor = store.getState().vendor;

        if (vendor.vendorId === 0) {
            Actions.replace('map');
        } else {
            pageTitle = _e[global.lang].buy_from + ' ' + vendor.vendorName ;
        }

        this.state = {
            tabs: null,
            selectedTab : 0,
            loaded: false
        };
    }

    componentWillMount() {

        let vendor = store.getState().vendor;

        if(vendor.vendorId != 0 && vendor.categories.length > 0){
            this.setState({ tabs: [...vendor.categories].reverse() });


            if(this.props.activeCate != undefined){
                if(this.props.activeCate != -1){
                    var k = 0;
                    for(k = 0; k < vendor.categories.length; k ++)
                        if(vendor.categories[k].id == this.props.activeCate)
                            break;
                    if(k == vendor.categories.length)
                        k --;
                    this.setState({ selectedTab: vendor.categories.length - 1 - k });    
                }
                else
                    this.setState({ selectedTab: vendor.categories.length - 1 });
            }
            else{
                this.setState({ selectedTab: vendor.categories.length - 1 });
            }

            this.setState({ loaded: true });    

        }
        else{
            store_categories(store.getState().user.userId, 
                this.props.store_id,
                0, 
                true,
                store.getState().user.apiToken)
            .then((response) => {
                if (response.status != "success" && response.error) {
                    console.log(response.error);
                    return;
                }
                

                this.props.setVendor({
                    vendorId: store.getState().vendor.vendorId,
                    vendorName: store.getState().vendor.vendorName,
                    categories:response.data,
                    vendorInfo:store.getState().vendor.vendorInfo,
                    open: store.getState().vendor.open,
                    free_delivery: store.getState().vendor.free_delivery
                });
                
                this.setState({ tabs: [...response.data].reverse() });
                
                if(this.props.activeCate != undefined){
                    if(this.props.activeCate != -1){
                        var k = 0;
                        for(k = 0; k < response.data.length; k ++)
                            if(response.data[k].id == this.props.activeCate)
                                break;
                        if(k == response.data.length)
                            k --;
                        this.setState({ selectedTab: response.data.length - 1 - k });    
                    }
                    else
                        this.setState({ selectedTab: response.data.length - 1 });
                }
                else{
                    this.setState({ selectedTab: response.data.length - 1 });
                }

                this.setState({ loaded: true });    
            
            });                                
        }
    }

    render () {
            
        if(this.state.loaded){
            let store_id;
            if(store.getState().vendor.categories.length < 1){
                return (

                <Container>
                    <MainHeader title={pageTitle} />
                <View>
                    <Text style={{ textAlign: 'center'}}> There's no products... </Text>
                </View>
                </Container>
                )
            } 
            else{

                if(this.props.hasOwnProperty('store_id'))
                    store_id = this.props.store_id;
                else
                    store_id = store.getState().vendor.vendorId; 
                return (   
                    <Container>
                        <MainHeader title={pageTitle} />
                        <ProductTabs store_id={ store_id ? store_id : -1 } activeCate={ this.props.activeCate ? this.props.activeCate : -1 } activeSubCate={ this.props.activeSubCate ? this.props.activeSubCate : -1 } tabs={this.state.tabs} selectedTab={this.state.selectedTab}   />
                    </Container>
                )

            }
            
        }
        else{
            return (

                <Container>
                    <MainHeader title={pageTitle} />
                <View>
                    <Text style={{ textAlign: 'center'}}> There's no products... </Text>
                </View>
                </Container>
            )
        }
    }
}

const mapDispatchToProps = dispatch => {
    return { setVendor : vendor => { dispatch(setVendor(vendor)) } }
}

export default connect(null, mapDispatchToProps)(Home)