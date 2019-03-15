import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { Container , Header , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { form, base, loading } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import RadioButton from 'react-native-radio-button';
import UserHeader from './../Shared/UserHeader';
import { setUser } from "../../actions";
import { connect } from "react-redux";
import store from './../../store/configuteStore';
import { _e } from '../../lang';

import * as Progress from 'react-native-progress';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  DefaultAnimation,
} from 'react-native-popup-dialog';
const scaleAnimation = new ScaleAnimation();
import { get_profile, update_profile } from './../Root/api.js';
import Terms from "./Terms";

let lang = 'en';
let pageTitle = _e[lang].edit_profile;

const strError = null;

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname : null,
            telephone : null,
            email : null,
            address : null,
            birthdate : null,
            gender : null,

            fullnameError: false,
            telephoneError: false,
            emailError: false,
            addressError: false,
            birthdateError: false,

            loaded: true
        };
    }

    componentWillMount() {
        this.setState({ loaded: false });
        get_profile(store.getState().user.userId, store.getState().user.apiToken)
        .then((response) => {
            if (response.status != "success" && response.error) {
                let strError = response.error;
                this.scaleAnimationDialog.show();
                // Alert.alert(response.error);
                this.setState({ loaded: true });
                return;
            }
            this.setState({
                fullname: response.data.fullname,
                email: response.data.email,
                birthdate: response.data.birthdate,
                gender: response.data.gender,

                loaded: true
            });
        });
    }

    onBtnRegisterProfileBtnPressed(fullname, telephone, email, address, birthdate, gender) {
        Keyboard.dismiss();

        this.setState({ fullnameError: false });
        this.setState({ telephoneError: false });
        this.setState({ emailError: false });
        this.setState({ addressError: false });
        this.setState({ birthdateError: false });

        if (!fullname) {
            this.setState({ fullnameError: true });
            let strError = 'Full name should not be empty.';
            this.scaleAnimationDialog.show();
            // Alert.alert('Full name should not be empty.');
            return;
        }
        if (!email) {
            this.setState({ emailError: true });
            let strError = 'Email address should not be empty.';
            this.scaleAnimationDialog.show();
            // Alert.alert('Email address should not be empty.');
            return;
        } else if (email.indexOf('@') === -1 || email.toLowerCase().indexOf('.com') === -1) {
            this.setState({ emailError: true });
            let strError = 'Please enter a valid email address.';
            this.scaleAnimationDialog.show();
            // Alert.alert('Please enter a valid email address.');
            return;
        }

        this.setState({ loaded: false });
        update_profile(store.getState().user.userId, store.getState().user.apiToken, fullname, email, birthdate, gender)
        .then((response) => {
            if (response.status != "success" && response.error) {
                let strError = response.error;
                this.scaleAnimationDialog.show();
                // Alert.alert(response.error);
                this.setState({ loaded: true });
                return;
            }

            this.props.setUser({
                userId: store.getState().user.userId,
                name: response.data.fullname,
                email: response.data.email,
                apiToken: response.data.token,
                mobile: store.getState().user.mobile,
            });

            this.setState({ loaded: true });
        });
    }

    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={base.contentBg}>
                    <Form style={form.StyleForm}>
                        <Text style={base.mediumText}>It is recommended that you complete all the information on this page in order to benefit from discounts and special offers.</Text>
                        <Item rounded style={ this.state.fullnameError ? [form.item,base.top20, form.invalid] : [form.item,base.top20]} >
                            <Input
                                value = { this.state.fullname }
                                placeholder='Full name*'
                                style={form.input}
                                maxLength = {50}
                                onChangeText={(text) => this.setState({fullname: text})}
                            />
                            <Icon active name='ios-person-outline' />
                        </Item>
                        <Item rounded style={form.item} >
                            <Input
                                editable = {false}
                                value = { store.getState().user.mobile }
                                placeholder='Mobile number*'
                                style={form.input}
                                maxLength = {11}
                                keyboardType="phone-pad"
                                onChangeText={(text) => this.setState({mobile: text.replace(' ', '')})}
                            />
                            <Icon active name='ios-phone-portrait-outline' />
                        </Item>

                        <Item rounded style={ this.state.emailError ? [form.item, form.invalid] : form.item } >
                            <Input
                                value = { this.state.email }
                                placeholder='Email*'
                                style={form.input}
                                maxLength = {40}
                                keyboardType="email-address"
                                onChangeText={(text) => this.setState({email: text.replace(' ', '')})}
                            />
                            <Icon active name='ios-mail-outline' />
                        </Item>
                        <Item rounded style={form.item} >
                            <Input
                                value = { this.state.birthdate }
                                placeholder='Date of birth'
                                style={form.input}
                                maxLength = {10}
                                onChangeText={(text) => this.setState({birthdate: text.replace(' ', '')})}
                            />
                            <Icon active name='ios-calendar-outline' />
                        </Item>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', marginTop:10, marginBottom:20}}>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={form.genderText}>I'm a Male</Text>
                                <RadioButton
                                    animation={'bounceIn'}
                                    isSelected={this.state.gender === "F"?true:false}
                                    innerColor={'#852c50'}
                                    outerColor={'#ddd'}
                                    onPress={() => this.setState({ gender: "F" })}
                                />
                            </View>

                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <Text style={form.genderText}>I'm a Female</Text>
                                <RadioButton
                                    animation={'bounceIn'}
                                    isSelected={this.state.gender === "M"?true:false}
                                    innerColor={'#852c50'}
                                    outerColor={'#ddd'}
                                    onPress={() => this.setState({ gender: "M" })}
                                />
                            </View>
                        </View>

                        { this.state.loaded ? 
                            <Button full style={form.submitButton}
                                onPress={()=>this.onBtnRegisterProfileBtnPressed(this.state.fullname, this.state.telephone, this.state.email, this.state.address, this.state.birthdate, this.state.gender)}>
                                <Text style={form.submitText}>Register Profile</Text>
                            </Button>
                            : 
                            <Button full style={form.submitButton}>
                                <Text style={form.submitText}>Register Profile</Text>
                                <Progress.CircleSnail color={ '#FFFFFF' }
                                    style={loading.progress}
                                />
                            </Button>
                        }
                        <View style={[base.flexCenter,base.top30]} >
                            <Text style={base.smallText}>All user information is considered confidential and will not be shared with anyone</Text>
                        </View>

                    </Form>
                </Content>

                {/* ===== Popup Dialog ===== */}
                <PopupDialog
                    ref={(popupDialog) => { this.scaleAnimationDialog = popupDialog; }}
                    dialogAnimation={ scaleAnimation}
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

export default connect(null,mapDispatchToProps)(EditProfile)