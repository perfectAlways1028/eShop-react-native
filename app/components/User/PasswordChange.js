import React from 'react';
import { Container , Header , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { form, base } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import UserHeader from './../Shared/UserHeader';

const pageTitle = 'تغییر رمز عبور'
export default class PasswordChange extends React.Component {
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={base.contentBg}>
                    <Form style={form.StyleForm}>
                        <Item rounded style={form.item}>
                            <Input
                                placeholder='رمز عبور فعلی*'
                                style={form.input}
                                maxLength = {20}
                            />
                            <Icon active name='ios-key' />
                        </Item>
                        <Item rounded style={form.item}>
                            <Input
                                placeholder='رمز عبور جدید*'
                                style={form.input}
                                maxLength = {20}
                            />
                            <Icon active name='ios-key-outline' />
                        </Item>
                        <Button full style={form.submitButton} onPress={()=>Actions.loginLightbox()}>
                            <Text style={form.submitText}>تغییر رمز عبور</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}
