import React from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Container , View , Text , Content , Form , Button, Item , Icon , Input } from 'native-base';
import { form, base, loading } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import UserHeader from './../Shared/UserHeader';
import {setUser} from "../../actions";
import {connect} from "react-redux";
import { _e } from '../../lang';

import * as Progress from 'react-native-progress';
import DeviceInfo from 'react-native-device-info';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  DefaultAnimation,
} from 'react-native-popup-dialog';
const scaleAnimation = new ScaleAnimation();
import { sms_login, onesignal_token_update } from './../Root/api.js';

let lang = 'en';
let pageTitle = _e[lang].login;
const strError = null;

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobile : '',

            mobileError: false,

            loaded: true
        };
    }

    onBtnGetCodeBtnPressed(mobile) {
        Keyboard.dismiss();

        this.setState({ mobileError: false });
        strError = null;
        // check mobile number
        if (!mobile) {
            strError = "Mobile number should not be empty.";
        } else if (mobile.length >= 2 && (mobile[0] != '0' || mobile[1] != '9')) {
            strError = "Mobile number should be started with '09'.";
        } else if (mobile.length < 11) {
            strError = "Please enter a valid mobile number.";
        }
        for (let i = 0; i < mobile.length; i ++) {
            if (mobile[i] < '0' || mobile[i] > '9') {
                strError = "Please enter a valid mobile number.";
                break;
            }
        }
        if (strError) {
            this.setState({ mobileError: true });
            this.scaleAnimationDialog.show();
            // Alert.alert(strError);
            return;
        }

        this.setState({ loaded: false });

        navigator.geolocation.getCurrentPosition((position) => {
            sms_login(mobile, DeviceInfo.getUniqueID(), position.coords.latitude.toString(), position.coords.longitude.toString())
            .then((response) => {
                if (response.status != "success" && response.error) {
                    this.scaleAnimationDialog.show();
                    strError = response.error;
                    // Alert.alert(response.error);
                    this.setState({ loaded: true });
                    return;
                }

                this.props.setUser({
                    userId: response.data.user_id,
                    name: response.data.fullname,
                    mobile: mobile,
                    apiToken: response.data.token
                });
                // call onesignal token update
                 AsyncStorage.getItem('one_player_id').then(one_player_id => {
                     if (!one_player_id) return false;
                     AsyncStorage.getItem('one_player_token').then(one_player_token => {
                        if (!one_player_token) return false;
                        onesignal_token_update(response.data.user_id, response.data.token, one_player_id, one_player_token);
                     });                  
                })
                this.setState({ loaded: true });
                Actions.replace('confirm_code');
            });
        },
        (error) => alert(JSON.stringify(error)),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    }
    
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={base.contentBg}>
                    <Form style={form.StyleForm} >
                        <Item rounded style={ this.state.mobileError ? [form.item, form.invalid] : form.item } >
                            <Input
                                value = { this.state.mobile }
                                placeholder={_e[lang].mobile + '*'}
                                style={form.input}
                                maxLength = {11}
                                keyboardType="phone-pad"
                                onChangeText={(text) => this.setState({mobile: text.replace(' ', '')})}
                            />
                            <Icon active name='ios-call-outline' />
                        </Item>
                        { this.state.loaded ? 
                            <Button full style={form.submitButton} onPress={()=>this.onBtnGetCodeBtnPressed(this.state.mobile)}>
                                <Text style={form.submitText}>{_e[lang].get_code}</Text>
                            </Button>
                            : 
                            <Button full style={form.submitButton}>
                                <Progress.CircleSnail color={ '#FFFFFF' }
                                    style={loading.progress}
                                />
                            </Button>
                        }
                        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                            <View style={base.top20}>
                                <Text onPress={() => { Keyboard.dismiss(); Actions.replace('confirm_code');}} style={[base.smallText, base.top20]}>
                                    {_e[lang].forgot_password}
                                </Text>
                                <Text onPress={() => { Keyboard.dismiss(); Actions.push('signup');}} style={[base.normalText, base.top30, {textAlign:'center'}]}>
                                    {_e[lang].not_member}
                                </Text>
                                <Text onPress={() => { Keyboard.dismiss(); Actions.push('signup');}} style={[base.linkedText, base.top10, base.boldPrimary, {textAlign:'center'}]}>
                                    {_e[lang].become_member}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Form>
                </Content>

                {/* ===== Popup Dialog ===== */}
                <PopupDialog
                    ref={(popupDialog) => { this.scaleAnimationDialog = popupDialog; }}
                    dialogAnimation={scaleAnimation}
                    width={ 0.8 }
                    height={ 0.3 }
                    overlayPointerEvents='none'
                >
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF0' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#852c50', fontSize: 20, marginBottom: 40, paddingLeft: 10, paddingRight: 10 }}>
                            { "Warnning!\n\n" + strError }
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

const mapDispatchToProps = dispatch => {
    return {
        setUser : user => { dispatch(setUser(user)) }
    }
}

export default connect(null,mapDispatchToProps)(Login)