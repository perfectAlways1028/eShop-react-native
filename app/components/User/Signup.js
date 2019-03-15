import React from 'react';
import { Alert, Keyboard, AsyncStorage } from 'react-native';
import { Container , Header , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { form, base, loading } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';
import UserHeader from './../Shared/UserHeader';
import { setUser } from "../../actions";
import { connect } from "react-redux";
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
import { user_signup, onesignal_token_update } from './../Root/api.js';

let lang = 'en';
let pageTitle = _e[lang].signup;
const strError = null;

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: "",
            mobile: "",
            email: "",
            referrer: "",

            fullnameError: false,
            mobileError: false,
            emailError: false,

            loaded: true
        };
    }

    onBtnRegisterBtnPressed(fullname, mobile, email, referrer) {
        Keyboard.dismiss();

        this.setState({ fullnameError: false });
        this.setState({ mobileError: false });
        this.setState({ emailError: false });
        strError = null;
        
        // check fullname
        if (!fullname) {
            strError = "Full name should not be empty.";
        }
        if (strError) {
            this.setState({ fullnameError: true });
            this.scaleAnimationDialog.show();
            // Alert.alert(strError);
            return;
        }

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

        // check email address
        if (!email) {
            strError = "Email should not be empty.";
        } else if (email.indexOf('@') === -1 || email.toLowerCase().indexOf('.com') === -1) {
            strError = "Please enter a valid email address";
        }

        if (strError) {
            this.setState({ emailError: true });
            this.scaleAnimationDialog.show();
            // Alert.alert(strError);
            return;
        }


        this.setState({ loaded: false });
        navigator.geolocation.getCurrentPosition((position) => {
            user_signup(mobile, DeviceInfo.getUniqueID(), fullname, email, referrer, 
                        position.coords.latitude.toString(), position.coords.longitude.toString())
            .then((response) => {
                if (response.status != "success" && response.error) {
                    strError = response.error;
                    this.scaleAnimationDialog.show();
                    // Alert.alert(response.error);
                    this.setState({ loaded: true });
                    return;
                }

                this.props.setUser({
                    userId: response.data.user_id,
                    name: fullname,
                    mobile: mobile,
                    email: email,
                    apiToken: response.data.token
                });
                //call update onesignal token api call
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
                    <Form style={form.StyleForm}>
                        <Item rounded style={ this.state.fullnameError ? [form.item, form.invalid] : form.item } >
                            <Input
                                value = { this.state.fullname }
                                placeholder={ _e[lang].fullname + '*'}
                                style={form.input}
                                maxLength = {50}
                                onChangeText={(text) => this.setState({fullname: text})}
                            />
                            <Icon active name='ios-person-outline' />
                        </Item>
                        <Item rounded style={ this.state.mobileError ? [form.item, form.invalid] : form.item } >
                            <Input
                                value = { this.state.mobile }
                                placeholder={ _e[lang].mobile + '*'}
                                style={form.input}
                                maxLength = {11}
                                keyboardType='numeric'
                                onChangeText={(text) => this.setState({mobile: text.replace(' ', '')})}
                            />
                            <Icon active name='ios-call-outline' />
                        </Item>

                        <Item rounded style={ this.state.emailError ? [form.item, form.invalid] : form.item } >
                            <Input
                                value = { this.state.email }
                                placeholder={ _e[lang].optional_email + '*'}
                                style={form.input}
                                maxLength = {55}
                                keyboardType="email-address"
                                onChangeText={(text) => this.setState({email: text.replace(' ', '')})}
                            />
                            <Icon active name='ios-people-outline' />
                        </Item>
                        <Item rounded style={form.item} >
                            <Input
                                value = { this.state.referrer }
                                placeholder={_e[lang].referrer}
                                style={form.input}
                                maxLength = {7}
                                onChangeText={(text) => this.setState({referrer: text.replace(' ', '')})}
                            />
                            <Icon active name='ios-people-outline' />
                        </Item>
                        { this.state.loaded ? 
                            <Button full style={form.submitButton}
                                onPress={ ()=>this.onBtnRegisterBtnPressed(this.state.fullname, this.state.mobile, this.state.email, this.state.referrer) }>
                                <Text style={form.submitText}>{ _e[lang].register}</Text>
                            </Button>
                            : 
                            <Button full style={form.submitButton}>
                                <Progress.CircleSnail color={ '#FFFFFF' }
                                    style={loading.progress}
                                />
                            </Button>
                        }
                        <View style={[base.flexCenter,base.top30]} >
                            <Text style={base.smallText}>{ _e[lang].accept_terms }</Text>
                        </View>
                        <View style={[base.flexCenter,base.top10]}>
                            <Text style={base.smallLink}>{ _e[lang].terms }</Text>
                        </View>
                        <View style={[base.flexCenter,base.top10]}>
                            <Text style={base.smallLink}>{ _e[lang].privacy }</Text>
                        </View>
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
    return { setUser : user => { dispatch(setUser(user)) } }
}

export default connect(null,mapDispatchToProps)(Signup)