import React from 'react';
import { Container , Header , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { form, base } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import UserHeader from './../Shared/UserHeader';

const pageTitle = 'بازیابی رمز عبور'
export default class PasswordReset extends React.Component {

    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={base.contentBg}>
                    <Form style={form.StyleForm}>
                        <Item rounded style={form.item} >
                            <Input
                                placeholder='شماره همراه*'
                                style={form.input}
                                maxLength = {11}
                                keyboardType="phone-pad"
                            />
                            <Icon active name='ios-call-outline' />
                        </Item>
                        <Button full style={form.submitButton} onPress={()=>Actions.loginLightbox()}>
                            <Text style={form.submitText}>بازیابی رمز عبور</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}
