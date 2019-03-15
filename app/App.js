import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Router , Scene , Lightbox ,Drawer} from 'react-native-router-flux';
import { connect , Provider } from 'react-redux';
import { Alert, AsyncStorage } from 'react-native';
import { MenuContext } from 'react-native-popup-menu';
// Components
/* Root */

import Startup from "./components/Root/Startup";
import SplashScreen from "./components/Root/SplashScreen";

import DrawerLayout from "./components/Shared/DrawerLayout";
import Home from "./components/Root/Home";
import Offers from "./components/Shop/Offers";
import Categories from "./components/Shop/Categories";
import ViewProduct from "./components/Shop/ViewProduct";

import Login from "./components/User/Login";

import Orders from "./components/User/Orders";
import Transactions from "./components/User/Transactions";
import Notifications from "./components/User/Notifications";
import Rewards from "./components/User/Rewards";
import Settings from "./components/User/Settings";
import Support from "./components/User/Support";
import Map from "./components/Shop/Map";
import Basket from "./components/Shop/Basket";
import EditProfile from "./components/User/EditProfile";
import UserProfile from "./components/User/UserProfile";
import Signup from "./components/User/Signup";
import store from "./store/configuteStore";
import PasswordReset from "./components/User/PasswordReset";
import PasswordChange from "./components/User/PasswordChange";

import VendorSettings from "./components/Vendor/VendorSettings";
import VendorOrders from "./components/Vendor/VendorOrders";
import VendorOrderDetails from "./components/Vendor/VendorOrderDetails";
import ShopHome from "./components/Shop/ShopHome";
import ConfirmCode from "./components/User/ConfirmCode";
import ShopsNearby from "./components/Shop/ShopsNearby";
import OneSignal from 'react-native-onesignal';
// Build Stylesheet
EStyleSheet.build({
    $primaryColor : '#852c50',
    $primaryColorDark : '#570f2c',
    $secondaryColor : '#ea9c51',
    $whiteColor : '#fff',
    $ultraLightGray: '#fcfcfc',
    $borderColor: '#ddd',
    $lightGrayColor : '#ababab',
    $grayColor : '#899494',
    $darkGrayColor : '#696969',
    $lightBlackColor : '#464646',
    $blackColor : '#2e2e2e',
    $redColor: '#ec6160',
    $greenColor: '#6fbe44',
    $inputBoxColor: '#a3a3a3',
    $inputBoxBorder: '#e8e8e8',
    $inputBoxBgColor: '#f7f7f7',
    $IS : 'ISans',
    $ISB : 'ISans_Bold',
    /*$IS : 'Arial',
    $ISB : 'Arial Bold'*/
})

export default class App extends React.Component {
    constructor(){
        super();
        //control global varaible lang
        global.lang = 'en';

    }

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);

        //Alert.alert(notification.payload.title? notification.payload.title:"Notification", notification.payload.body);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
        console.warn("Device", device);
        //save payer id and player token to asyncstorage
        AsyncStorage.setItem('one_player_id', device.userId);
        AsyncStorage.setItem('one_player_token', device.pushToken);

    }
    render() {
        const  RouterWithRedux = connect()(Router);
        return (
            <Provider store={store}>
                <MenuContext style={{ flex: 1 }}>
                <RouterWithRedux>
                    <Scene hideNavBar key="hidenav">
                        <Scene key="root" hideNavBar>
                            <Drawer
                                key="drawer"
                                contentComponent={DrawerLayout}
                                drawerPosition="right" >
                                <Scene hideNavBar key="hidenavbar">
                                    <Scene key="home" component={Home} initial/>
                                    <Scene key="map" component={Map} />
                                    <Scene key="categories" component={Categories} />
                                    <Scene key="shop_home" component={ShopHome} />
                                    <Scene key="shops_nearby" component={ShopsNearby} />
                                    <Scene key="product" component={ViewProduct}  />
                                    <Scene key="basket" component={Basket}/>
                                    <Scene key="orders" component={Orders}/>
                                    <Scene key="rewards" component={Rewards}/>
                                    <Scene key="notifications" component={Notifications}/>
                                    <Scene key="transactions" component={Transactions}/>
                                    <Scene key="support" component={Support}/>
                                    <Scene key="settings" component={Settings}/>
                                    <Scene key="user_profile" component={UserProfile}/>
                                    <Scene key="edit_profile" component={EditProfile}/>
                                    <Scene key="password_reset" component={PasswordReset}/>
                                    <Scene key="confirm_code" component={ConfirmCode}/>
                                    <Scene key="password_change" component={PasswordChange}/>
                                    <Scene key="vendor_settings" component={VendorSettings}/>
                                    <Scene key="vendor_orders" component={VendorOrders}/>
                                    <Scene key="vendor_order" component={VendorOrderDetails}/>
                                </Scene>
                            </Drawer>
                        </Scene>
                        <Scene key="splash" component={SplashScreen} initial/>
                        <Scene key="auth" component={Login} />
                        <Scene key="signup" component={Signup} />
                        <Scene key="startup" component={Startup}/>
                    </Scene>
                </RouterWithRedux>
                </MenuContext>
            </Provider>
        )
    }
}