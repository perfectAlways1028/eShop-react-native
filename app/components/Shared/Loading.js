import React from 'react';
import { base, loading } from './../../assets/styles';
import { Container, View, Text, Spinner} from 'native-base';
import {Image, Animated, Easing, Dimensions, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={loading.wrap}>
                    <View style={loading.lightBox}>
                        <Text style={base.normalText}>لطفا کمی صبر کنید...</Text>
                        <Spinner color={'#852c50'}/>
                    </View>
            </Container>
        )
    }
}