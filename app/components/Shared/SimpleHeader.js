import React from 'react';
import {Header , View , Text , Left , Right , Icon} from 'native-base';
import { shared } from './../../assets/styles';
import { base, popupmenu } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';


export default class SimpleHeader extends React.Component {
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

                   <View>
                       <Menu>
                           <MenuTrigger >
                               <Icon name='md-more' style={base.menuIcon} />
                           </MenuTrigger>
                           <MenuOptions style={popupmenu.menuWrapper}>
                               <MenuOption style={popupmenu.menuOption} onSelect={() => Actions.push('edit_profile')} >
                                   <Text style={base.normalText}>ویرایش اطلاعات شخصی</Text>
                               </MenuOption>
                               <MenuOption style={popupmenu.menuOption} onSelect={() => Actions.push('password_change')} >
                                   <Text style={base.normalText}>تغییر رمز عبور</Text>
                               </MenuOption>
                               <MenuOption style={popupmenu.menuOption} onSelect={() => Actions.push('settings')} >
                                   <Text style={base.normalText}>تنظیمات کاربری</Text>
                               </MenuOption>
                           </MenuOptions>
                       </Menu>
                   </View>
               </Right>
            </Header>
        )
    }
}
