import React, { Component } from 'react';
import {Dimensions, Image, ScrollView, Alert,TouchableOpacity } from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input, Spinner } from 'native-base';
import MainHeader from "./../Shared/MainHeader";
import { categories, form } from './../../assets/styles';
import { _e } from '../../lang';

import { Actions } from 'react-native-router-flux';

import * as Progress from 'react-native-progress';
import { store_categories } from './../Root/api.js';
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


const {
    width: windowWidth
} = Dimensions.get('window');

//const pageTitle = 'قفسه های فروشگاه';
let lang = 'en';
//let pageTitle = _e[global.lang].shelves;


export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrCategories: null,
            loaded: true
        };
    }

    componentWillMount() {
        this.setState({ loaded: false });

        store_categories(store.getState().user.userId, this.props.store_id, 0, false, store.getState().user.apiToken)
        .then((response) => {
            if (response.status != "success" && response.error) {
                this.scaleAnimationDialog.show();
                let strError = response.error;
                this.setState({ loaded: true });
                return;
            }

            this.setState({ arrCategories: response.data });

            this.setState({ loaded: true });
        });
    }
    
    setProduct(parentCate , childCate){
        Actions.push('home', { store_id: this.props.store_id , activeCate:parentCate , activeSubCate:childCate});
    }

    render() {
        let uri = "http://asanpakhsh.com/contents/terms/xhd/";
        return (
            <Container>
                <MainHeader title={_e[global.lang].shelves}/>
                <ScrollView>
                    {
                        this.state.arrCategories != null ?
                            this.state.arrCategories.map((category, index) =>(
                                <View key={ index }>
                                 
                                    <View style={categories.box} >
                                        <View style={categories.headingBox}>
                                            <Text style={categories.heading}>{ category.title }</Text>
                                        </View>
                                    </View>
                                    
    
                                    <View style={categories.box}>
                                        {Object.keys(this.state.arrCategories[index].sub).map((item)=> {
                                            return (
                                                <View key={item}>
                                                <TouchableOpacity onPress={()=>this.setProduct(this.state.arrCategories[index].id , this.state.arrCategories[index].sub[item].id)}>
                                                    <Image style={categories.icon} source={{uri: uri + this.state.arrCategories[index].sub[item].image}}  resizeMode="contain" />
                                                    <Text style={categories.label} key={item}>{this.state.arrCategories[index].sub[item].title}</Text>
                                                </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            ))
                        :
                            <Spinner color={ '#852c50' } />
                    }
                </ScrollView>
            </Container>
        );
    }
}