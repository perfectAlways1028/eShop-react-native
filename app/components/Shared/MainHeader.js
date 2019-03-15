import React from 'react';
import {Header , View , Text , Left , Right , Icon} from 'native-base';
import { base, shared } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';

export default class MainHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <Header style={shared.header} androidStatusBarColor='#570f2c' iosBarStyle="light-content">
               <Left onPress={() => Actions.pop()}>
                   <View style={{flex:1, flexDirection:'row', paddingTop:15}}>
                       <Icon name='ios-search-outline' style={base.menuIcon}/>
                       <Icon name='ios-options-outline' style={base.menuIcon}/>
                       <View>
                           <Icon name='ios-cart-outline' style={base.menuIcon}  onPress={() => Actions.push('basket')} />
                           <View style={base.newItem}></View>
                       </View>
                   </View>
               </Left>
               <Right>
                   <Text style={shared.headerText}>{this.props.title}</Text>
                   <Icon name='md-menu' style={base.menuIcon}  onPress={() => Actions.drawerOpen()}/>
               </Right>
            </Header>
        )
    }
}