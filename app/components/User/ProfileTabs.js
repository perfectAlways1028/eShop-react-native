import React, { PureComponent } from 'react';
import { Container , View, Left, Button, Right, Content, Form , Item , Icon , Input, Tab, Tabs, ScrollableTab  } from 'native-base';
import { tabsStyles } from './../../assets/styles';
import Transactions from './Transactions';
import type { NavigationState } from 'react-native-tab-view/types';
import ShopList from "./ShopList";
import {ScrollView, Image, Text } from 'react-native';
import Images from './../../assets/Images';
import { base, categories } from './../../assets/styles';
export default class ProfileTabs extends PureComponent<*, State> {
    constructor(props) {
        super(props);
    }
    tabChanged(page) {
        console.log("Tab changed");
    }
    handleScroll(event) {
        console.log("Handled scroll event");
    }
    render() {
        return (
            <Tabs renderTabBar={()=> <ScrollableTab />} style={tabsStyles.tab} initialPage={2}
                  onChangeTab={page => this.tabChanged(page)}
                  locked={true}>
                <Tab heading="لیست خرید" tabStyle={tabsStyles.nbtab} textStyle={tabsStyles.nblabel} activeTabStyle={tabsStyles.tabActive} activeTextStyle={tabsStyles.labelActive}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={event => this.handleScroll(event)}
                    >
                        <View >
                            <Image source={Images.logo} resizeMode="contain" />
                            <Text style={categories.label} >title</Text>
                        </View>
                        <View >
                            <Image source={Images.logo} resizeMode="contain" />
                            <Text style={categories.label} >title</Text>
                        </View>
                        <View >
                            <Image source={Images.logo} resizeMode="contain" />
                            <Text style={categories.label} >title</Text>
                        </View>
                        <View >
                            <Image source={Images.logo} resizeMode="contain" />
                            <Text style={categories.label} >title</Text>
                        </View>
                        <View >
                            <Image source={Images.logo} resizeMode="contain" />
                            <Text style={categories.label} >title</Text>
                        </View>
                        <View >
                            <Image source={Images.logo} resizeMode="contain" />
                            <Text style={categories.label} >title</Text>
                        </View>
                        <View >
                            <Image source={Images.logo} resizeMode="contain" />
                            <Text style={categories.label} >title</Text>
                        </View>
                    </ScrollView>
                    <ShopList/>
                </Tab>
                <Tab heading="مشاهده شده" tabStyle={tabsStyles.nbtab} textStyle={tabsStyles.nblabel} activeTabStyle={tabsStyles.tabActive} activeTextStyle={tabsStyles.labelActive}>
                    <Transactions/>
                </Tab>
                <Tab heading="گردش حساب" tabStyle={tabsStyles.nbtab} textStyle={tabsStyles.nblabel} activeTabStyle={tabsStyles.tabActive} activeTextStyle={tabsStyles.labelActive}>
                    <Transactions/>
                </Tab>
            </Tabs>
        );
    }
}

