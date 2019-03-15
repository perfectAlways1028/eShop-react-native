import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { Container , Header , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { form, base, loading } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import UserHeader from './../Shared/UserHeader';
import {categories} from "../../assets/styles";
import { setUser } from "../../actions";
import { connect } from "react-redux";
import store from "./../../store/configuteStore";
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
import { confirm_mobile } from './../Root/api.js';

let lang = 'en';
let pageTitle = _e[lang].confirm_code;
const strError = null;

class ConfirmCode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            codeError: false,

            loaded: true
        };
    }
    
    onBtnConfirmBtnPressed(code) {
        Keyboard.dismiss();

        this.setState({ codeError: false });

        if (!code) {
            this.setState({ codeError: true });
            strError = 'Code should not be empty.';
            this.scaleAnimationDialog.show();
            // Alert.alert('Code should not be empty.');
            return;
        } else if (code != parseInt(code).toString()) {
            this.setState({ codeError: true });
            strError = 'Please enter a valid code.';
            this.scaleAnimationDialog.show();
            // Alert.alert('Please enter a valid code.');
            return;
        }

        this.setState({ loaded: false });

        confirm_mobile(store.getState().user.userId, store.getState().user.apiToken, code)
        .then((response) => {
            if (response.status != "success" && response.error) {
                strError = response.error;
                this.scaleAnimationDialog.show();
                // Alert.alert(response.error);
                this.setState({ loaded: true });
                return;
            }

            this.props.setUser({
                name: response.data.fullname,
                userId: response.data.user_id,
                apiToken: response.data.token,
                mobile: store.getState().user.mobile,
                email: store.getState().user.email
            });

            this.setState({ loaded: true });
            // Actions.loginLightbox();
            Actions.reset('root');
        });
    }

    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={base.contentBg}>
                    <Form style={form.StyleForm}>
                        <Text style={[base.normalText, categories.center_align, base.top20]}>
                            {_e[lang].confirm_text_line_top}

                        </Text>
                        <Text style={[base.boldPrimary, categories.center_align, base.top20]}>
                            { store.getState().user.mobile }</Text>
                        <Text style={[base.normalText, categories.center_align, base.top20]}>
                            {_e[lang].confirm_text_line_bottom}

                            </Text>
                        <Item rounded style={ this.state.codeError ? [form.itemCode, form.invalid] : form.itemCode } >
                            <Input
                                value = { this.state.code }
                                style={form.inputCode}
                                maxLength = {5}
                                keyboardType="numeric"
                                onChangeText={(text) => this.setState({code: text.replace(' ', '')})}
                            />
                        </Item>
                        { this.state.loaded ? 
                            <Button full style={form.submitButton} onPress={()=>this.onBtnConfirmBtnPressed(this.state.code)}>
                                <Text style={form.submitText}>{_e[lang].confirm}</Text>
                            </Button>
                            : 
                            <Button full style={form.submitButton}>
                                <Progress.CircleSnail color={ '#FFFFFF' }
                                    style={loading.progress}
                                />
                            </Button>
                        }
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

export default connect(null, mapDispatchToProps)(ConfirmCode)