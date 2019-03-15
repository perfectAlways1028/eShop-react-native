import React, { PureComponent } from 'react';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Products from './Products';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { tabsStyles } from './../../assets/styles';
import type { NavigationState } from 'react-native-tab-view/types';
import store from "../../store/configuteStore";

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;

let tabsStore = store.getState();
let tabs = tabsStore.vendor.categories;
console.log(tabs);

if (tabs.length<2) {
    tabs = [
        { key: '1', title: 'انواع لبنیات' },
        { key: '2', title: 'خواروبار' },
        { key: '3', title: 'مواد پروتئینی' },
        { key: '4', title: 'میوه و سبزیجات' },
        { key: '5', title: 'کنسروجات' },
        { key: '6', title: 'انواع نوشیدنی' },
        { key: '7', title: 'چاشنی و افزودنی' },
        { key: '8', title: 'خوراکی و تنقلات' },
        { key: '9', title: 'شوینده و بهداشتی' },
        { key: '10', title: 'لوازم مصرفی' },
    ];
}
//console.log(tabsStore.vendor.categories);



export default class TopBarTextExample extends PureComponent<*, State> {
    static title = 'Scrollable top bar';
    static appbarElevation = 0;

    state: State = {
        index: tabs.length-1,
        routes: tabs,
    };

    constructor(props) {
        super(props);
        tabs = [
            { key: '1', title: 'انواع لبنیات' },
            { key: '2', title: 'خواروبار' },
            { key: '3', title: 'مواد پروتئینی' },
            { key: '4', title: 'میوه و سبزیجات' },
            { key: '5', title: 'کنسروجات' },
            { key: '6', title: 'انواع نوشیدنی' },
            { key: '7', title: 'چاشنی و افزودنی' },
            { key: '8', title: 'خوراکی و تنقلات' },
            { key: '9', title: 'شوینده و بهداشتی' },
            { key: '10', title: 'لوازم مصرفی' },
        ];

        this.setState(
            {
                index: tabs.length-1,
                routes: tabs,
            }
        )
        tabs.reverse();
    }

    componentWillMount() {
        tabs = [
            { key: '1', title: 'انواع لبنیات' },
            { key: '2', title: 'خواروبار' }, { key: '3', title: 'مواد پروتئینی' },
            { key: '4', title: 'میوه و سبزیجات' },
            { key: '5', title: 'کنسروجات' },
            { key: '6', title: 'انواع نوشیدنی' },
            { key: '7', title: 'چاشنی و افزودنی' },
            { key: '8', title: 'خوراکی و تنقلات' },
            { key: '9', title: 'شوینده و بهداشتی' },
            { key: '10', title: 'لوازم مصرفی' },
        ];
        console.log('will');
        console.log(tabs);
    }




    _handleIndexChange = index => {

        this.setState({
            index: index,
        });
        this._renderScene;
    };

    _renderHeader = props => {
        return (
            <TabBar
                {...props}
                scrollEnabled
                indicatorStyle={tabsStyles.indicator}
                style={tabsStyles.tabbar}
                tabStyle={tabsStyles.tab}
                labelStyle={tabsStyles.label}
            />

        );
    };

    _renderScene = ({ route, index }) => {
        //if (parseInt(route.key) != (9-this.state.index+1)) return null;
        switch (route.key) {
            case '4':
                return (
                    <Products  />
                );
            case '2':
                return (
                    <Products  />
                );
            default:
                return (
                    <Products  />
                );
        }
    };

    render() {
        return (
            <TabViewAnimated
                style={[styles.container, this.props.style]}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}
