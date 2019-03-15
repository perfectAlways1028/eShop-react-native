import React from 'react';
import {Container , Header , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import {Image, Animated, Easing, Dimensions, StatusBar, Alert} from 'react-native';
import { base, form, startup } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import store from "./../../store/configuteStore";
import { _e } from '../../lang';

import { auto_login } from './../Root/api.js';

// Images
import Images from './../../assets/Images';

let lang = 'en';

export default class Startup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        }

        this.animatedValue = new Animated.Value(0);
    }

    componentWillMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue , {
            toValue : 1,
            duration : 360000,
            easing : Easing.linear
        }).start(() => this.animate())
    }

    render() {

        let ScreenHeight = Dimensions.get("window").height-StatusBar.currentHeight;
        let ScreenWidth = Dimensions.get("window").width;

        const firstMarginTop = this.animatedValue.interpolate({
            inputRange : [0, 0.5 ,1],
            outputRange : [0 , -3150 + ScreenHeight, 0]
        });

        return (
            <Container>
                <View>
                    <Animated.Image source={Images.signupBg } resizeMode="cover"  style= {[{marginTop: firstMarginTop, width:ScreenWidth, height:3150 }] }  />
                    <View style={startup.lightBox}>
                        <Content style={{padding:20}}>
                            <View style={[startup.logoWrapper, base.bottom20]}>
                                <Image source={Images.startlogo} resizeMode="contain"  style = {startup.logo}/>
                                <Text style={base.linkedText}>{_e[global.lang].slogan}</Text>
                            </View>
                            <Button full style={[form.submitButton, base.top10 ]} onPress={()=>Actions.push('signup')}>
                                <Text style={form.submitText}>{_e[global.lang].signup}</Text>
                            </Button>
                            <View style={[startup.logoWrapper, base.top20]}>
                                <Text style={[base.normalText, base.top20]} onPress={()=>Actions.push('auth')}>{_e[global.lang].already_member}</Text>
                                <Text style={base.boldPrimary} onPress={()=>Actions.push('auth')}>{_e[global.lang].login}</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end'}}>
                            <View style={startup.poweredBy}>
                                <Text style={base.tinyText}>{_e[global.lang].powered_by}</Text>
                            </View>
                            </View>
                        </Content>
                    </View>
                </View>
            </Container>
        )
    }
}