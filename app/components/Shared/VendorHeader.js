import React from 'react';
import {Header , View , Text , Left , Right , Icon} from 'native-base';
import { base, shared } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';

export default class VendorHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Header style={shared.header} androidStatusBarColor='#570f2c' iosBarStyle="light-content">
                <Right>
                    <Text style={shared.headerText}>{this.props.title}</Text>
                    <Icon name='md-menu' style={base.menuIcon}  onPress={() => Actions.drawerOpen()}/>
                </Right>
            </Header>
        )
    }
}