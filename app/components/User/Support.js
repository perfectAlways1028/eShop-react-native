import React from 'react';
import {TextInput, TextField} from 'react-native';
import { Container , Header , View , Text , Left , Radio, InputGroup, ListItem, Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import { form, base } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import UserHeader from './../Shared/UserHeader';
const pageTitle = 'پشتیبانی'
export default class Support extends React.Component {
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={base.contentBg}>
                    <Form style={form.StyleForm}>
                        <Text style={base.mediumText}>در صورت نیاز به تماس با بخش پشتیبانی می توانید با ما تماس بگیرید</Text>
                        <Button iconLeft full style={form.submitButton}>
                            <Icon name='ios-call' />
                            <Text style={form.submitText}>تماس با پشتیبانی</Text>
                        </Button>
                        <Text style={[base.mediumText,{paddingTop:20}]}>
                                چنانچه در خصوص سفارشات خود مشکلی دارید لطفا با ذکر شماره سفارش، مشکل خود را برای ما ارسال کنید:
                        </Text>
                        <ListItem >
                            <View style={form.listItem} >
                                <Text style={[base.mediumText, {paddingRight:10}]}>با سفارشم مشکل دارم</Text>
                                <Radio radioColor='red' radioBtnSize={10} selected={true} />
                            </View>
                        </ListItem>
                        <ListItem >
                            <View style={form.listItem} >
                                <Text style={[base.mediumText, {paddingRight:10}]}>مشکلی با پیک دارم</Text>
                                <Radio radioColor='red' radioBtnSize={10} />
                            </View>
                        </ListItem>
                        <ListItem >
                            <View style={form.listItem} >
                                <Text style={[base.mediumText, {paddingRight:10}]}>کالای ارسالی مشکل دارد</Text>
                                <Radio radioColor='red' radioBtnSize={10} />
                            </View>
                        </ListItem>
                        <ListItem >
                            <View style={form.listItem} >
                                <Text style={[base.mediumText, {paddingRight:10}]}>سفارش من کامل ارسال نشده است</Text>
                                <Radio radioColor='red' radioBtnSize={10} />
                            </View>
                        </ListItem>
                            <TextInput underlineColorAndroid='transparent' style={[form.textArea, form.input]}
                                       placeholder='لطفا درخواست خود را بنویسید'
                                        maxLength = {255}
                                        multiline={true}
                                        numberOfLines={7}
                            />
                        <Button full style={form.submitButton}>
                            <Text style={form.submitText}>ارسال درخواست</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )
    }
}
