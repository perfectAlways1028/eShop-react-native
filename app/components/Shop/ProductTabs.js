import React from 'react';
import { Alert } from 'react-native';
import Products from './Products';
import {Tab, Tabs, ScrollableTab, Spinner, View, Text  } from 'native-base';
import { tabsStyles } from './../../assets/styles';
import store from "../../store/configuteStore";
import { store_categories } from './../Root/api.js';


export default class ProductTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: props.tabs,
            selectedTab : props.selectedTab,
            loaded: true
        };

      
        // this.setState({ selectedTab: this.props.activeCate });
    }

    componentWillMount() {
     
        if (this.props.store_id == -1)
            return;

     /*   store_categories(store.getState().user.userId, 
            this.props.store_id,
            0, //this.props.activeCate == undefined ? 0 : this.props.activeCate,
            true, //this.props.activeCate == undefined ? true : false, 
            store.getState().user.apiToken)
        .then((response) => {
            if (response.status != "success" && response.error) {
                console.log(response.error);
                return;
            }
            
            this.setState( {
                store_id: this.props.store_id ? this.props.store_id : 0
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
           
        });*/
    }

    render() {
           
     //  alert('for the firtst' + this.state.selectedTab + '----' + JSON.stringify(this.state.tabs)); 

        if (this.state.tabs == null){
            return (
                <View>
                    <Spinner color={ '#852c50' } />
                    <Text style={{ textAlign: 'center' }}> There's no products... </Text>
                </View>
                );
        }

            return (
                

                <Tabs ref={ t=>this._tabs = t } initialPage={this.state.selectedTab} locked={true} renderTabBar={()=> <ScrollableTab />} >
                    { Object.keys(this.state.tabs).map((item)=> {
                           if(this.props.activeCate != undefined){
                            
                                if(this.props.activeCate > -1)
                                {
                                    if(this.props.activeCate == this.state.tabs[item].id){ 
                                        return (
                                            <Tab key={item}  style={{width: 500}} heading={this.state.tabs[item].title} tabStyle={tabsStyles.nbtab} textStyle={tabsStyles.nblabel} activeTabStyle={tabsStyles.tabActive} activeTextStyle={tabsStyles.labelActive}>
                                                <Products store_id={ this.props.store_id } parent_category={ this.state.tabs[item].id } activeSubCate = {this.props.activeSubCate} />
                                            </Tab>
                                        )
                                    }
                                    else{
                                        return (
                                            <Tab key={item}  style={{width: 500}} heading={this.state.tabs[item].title} tabStyle={tabsStyles.nbtab} textStyle={tabsStyles.nblabel} activeTabStyle={tabsStyles.tabActive} activeTextStyle={tabsStyles.labelActive}>
                                                <Products store_id={ this.props.store_id } parent_category={ this.state.tabs[item].id }/>
                                            </Tab>
                                        )
                                    }
                                }
                                else{
                                    return (
                                        <Tab key={item}  style={{width: 500}} heading={this.state.tabs[item].title} tabStyle={tabsStyles.nbtab} textStyle={tabsStyles.nblabel} activeTabStyle={tabsStyles.tabActive} activeTextStyle={tabsStyles.labelActive}>
                                            <Products store_id={ this.props.store_id } parent_category={ this.state.tabs[item].id }/>
                                        </Tab>
                                    )
                                }

                           }
                           else{
                                return (
                                    <Tab key={item}  style={{width: 500}} heading={this.state.tabs[item].title} tabStyle={tabsStyles.nbtab} textStyle={tabsStyles.nblabel} activeTabStyle={tabsStyles.tabActive} activeTextStyle={tabsStyles.labelActive}>
                                        <Products store_id={ this.props.store_id } parent_category={ this.state.tabs[item].id }/>
                                    </Tab>
                                )
                           }
                            
                        })
                    }
                </Tabs>
            );
    
    }
}
