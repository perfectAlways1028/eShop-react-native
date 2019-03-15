import React from 'react';
import {Dimensions, FlatList, ScrollView, Image, TouchableOpacity, Alert, AlertAndroid } from 'react-native';
import {Container, Header, Right, Button, Content, Text, Left, Icon , View, Spinner} from 'native-base';
import store from "../../store/configuteStore";
import Product from "./Product";
import { form , categories } from './../../assets/styles';
import { store_categories, get_products } from './../Root/api.js';

import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    DefaultAnimation,
  } from 'react-native-popup-dialog';
  const scaleAnimation = new ScaleAnimation();

const {
    width: windowWidth
} = Dimensions.get('window');

const scale =  windowWidth / 360;

var tileStyle = 0;
var panelSize = 0;
const imageSize  = (windowWidth-52) / 5;
var list_columns  = 2;

if (scale < 2) {
    tileStyle     = { height: 50+(windowWidth-40) / 3, width: (windowWidth-40) / 3, margin:5};
    panelSize     = imageSize * 1.5;
    list_columns  = 2;
} else {
    tileStyle     = { height: 50+(windowWidth-30) / 2, width: (windowWidth-30) / 2, margin:5};
    panelSize     = imageSize * 2.5;
    list_columns  = 3;
}

let key =0;
let activeSubCat = 0;
export default class Products extends React.PureComponent  {
   constructor(props) {
        super(props);
        
        // activeSubCat = this.props.parent_category;
        this.state = {
            subCategories: null,
            category: 0,


            products : [],
            initialState:1,
            currentPage : 1,
            nextPage:1,
            totalPages:1,
            loading : false,
            refreshing : false,
            loaded : false,
            productis : true
        }
        console.log('-');
    }
    componentWillMount() {
    
        store_categories(store.getState().user.userId, this.props.store_id, this.props.parent_category, false, store.getState().user.apiToken)
        .then((response) => {

            if (response.status != "success" && response.error) {
                console.log(response.error);
                return;
            }

            if(this.props.activeSubCate != undefined){
                if(this.props.activeSubCate != -1){
                    this.setState({ category: this.props.activeSubCate });
                }
                else{
                    this.setState({ category: response.data[0].sub[0].id });
                }
            }
            else{
                this.setState({ category: response.data[0].sub[0].id });
            }
            
            this.setState({ subCategories: [...response.data[0].sub].reverse() });

            this.setState({ loaded: true });

            this.getProductRequest();
            
        });
    }

    render() {

        if (this.state.subCategories == null && !this.state.loaded) {
            return (
                <View>
                    {/* <Spinner color={ '#852c50' } />
                    <Text style={{ textAlign: 'center' }}> There's no products... </Text> */}
                </View>
            );
        }
        else{
            
            //alert(JSON.stringify(this.state.subCategories));


            let uri = "http://asanpakhsh.com/contents/terms/xhd/";

        return (
            <Container style={{padding:5, width:windowWidth, backgroundColor:'#f4f4f4'}}>
                <View style={{height:panelSize, width:windowWidth, marginRight:5 }}>
                    <ScrollView ref={ref => this.scrollView = ref}
                                onContentSizeChange={(contentWidth, contentHeight)=>{
                                    this.scrollView.scrollToEnd({animated: false});
                                }} horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={this.state.subCategories.length<6?categories.shortList:''}
                                >
                        {Object.keys(this.state.subCategories).map((item)=> {
                            
                            return (
                                <View key={item}>
                                    <TouchableOpacity onPress={()=>this.selectSubCategory(this.state.subCategories[item].id)}>
                                        <Image  style={[categories.icon, (this.state.subCategories[item].id==this.state.category)?categories.activeSubCat:null, {height:imageSize, width:imageSize}]} source={{uri: uri + this.state.subCategories[item].image}}  resizeMode="contain" />
                                        <Text style={categories.label} key={item}>{this.state.subCategories[item].title}</Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        })}
                    </ScrollView>
                    </View>
 
                    {
                        this.state.productis ?
                        <FlatList
                        data={this.state.products}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={() => <Spinner  />}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh.bind(this)}
                        onEndReached={this.handleLoadMore.bind(this)}
                        onEndReachedThreshold={0.2}
                        numColumns = {list_columns}
                        style={{width:windowWidth}}
                        />
                        :
                        <View>
                        <Text style={{ textAlign: 'center' }}> There's no products... </Text>
                        </View>
                    }
                    
 
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

   renderItem({ item }) {
        return <Product product={item} userid={store.getState().user.userId} token={store.getState().user.apiToken} scale={scaleAnimation}  />
    }

    handleRefresh() {
        this.setState({ initialState:1, currentPage : 1 , nextPage:1  , refreshing : true } , () => {
            //this.setCategories();
            this.getProductRequest();
        })
    }

    renderFooter() {
        if(!this.state.loading) return null;

        return <Spinner color="#852c50" />
    
    }

    handleLoadMore() {
        if(this.state.currentPage < this.state.totalPages) {
            this.setState({loading : true}, () => {
                
                this.getProductRequest()
            })
         }
    }

    selectSubCategory(category) {
       
        this.setState ({category: category});
        this.handleRefresh();

    }

    setCategories() {
        category = this.props.category.key;
        subCategories = this.props.category.subcats;
        subCategories = [...subCategories].reverse();
    }

    getProductRequest() {
        
        this.setState({productis:true});

        const { currentPage, nextPage, category } = this.state;
        get_products(store.getState().user.userId, store.getState().user.apiToken, this.props.store_id, this.state.category, "all", 20, nextPage)
        .then((response) => {


            if (response.status != "success" && response.error) {

                console.log(response.error);
                return;
            }


            if ((response.page_no > this.state.currentPage) || (this.state.initialState === 1)) {
                let products = response.data;
                var i;
                for(i = 0; i < products.length; i ++){
                    products[i].store_id = this.props.store_id;
                }

                if (products.length > 0) {
                    this.setState(prevState => {
                        return {
                            products: nextPage === 1 ? products : [...prevState.products, ...products],
                            currentPage: parseInt(response.page_no),
                            totalPages: parseInt(response.total_pages),
                            nextPage: parseInt(response.page_no) + 1,
                            initialState:0,
                            refreshing: false
                        }
                    })
                }
                if(products.length < 1)
                    this.setState({loading: false , productis:false});
                else
                    this.setState({loading: false});
            }
        });
    }
}

