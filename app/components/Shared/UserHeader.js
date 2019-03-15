import React from 'react';
import {Header , View , Text , Left , Right , Icon} from 'native-base';
import { shared } from './../../assets/styles';
import { base } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';

export default class UserHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <Header style={shared.header} androidStatusBarColor='#570f2c' iosBarStyle="light-content" >
               <Left onPress={() => Actions.pop()}>
                   <Icon name='md-close' style={base.menuIcon}  onPress={() => Actions.pop()}/>
               </Left>
               <Right>
                   <Text style={shared.userHeaderText}>{this.props.title}</Text>
               </Right>
            </Header>
        )
    }
}