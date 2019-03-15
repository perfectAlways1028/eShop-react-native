import React from 'react';
import { Animated , Dimensions } from 'react-native';
import {View, Button, Text, Icon} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
const { height : deviceHeight , width : deviceWidth} = Dimensions.get('window');

export default class BaseLightbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity : new Animated.Value(0)
        }

    }

    componentWillMount() {
        Animated.timing(this.state.opacity,{
            toValue : 1,
            duration : 200
        }).start();
    }

    close() {
        Animated.timing(this.state.opacity,{
            toValue : 0,
            duration : 200
        }).start(Actions.pop);
    }

    _renderLightbox() {
        const { children , verticalPercent = 1 , horizontalPercent = 1 } = this.props;
        const width = verticalPercent ? deviceWidth * verticalPercent : deviceWidth;
        const height = horizontalPercent ? deviceHeight * horizontalPercent : deviceHeight;
        return (
            <View style={{ width , height, justifyContent: 'center' , alignItems: 'center' , backgroundColor : 'white' , borderRadius : 4}}>
                {children}
                <Button transparent style={{ position: 'absolute', top : 0 , left : 0}} onPress={() => this.close() }>
                    <Icon name='md-close-circle' style={{ fontSize : 30 , color : '#34495e'}}/>
                </Button>
            </View>
        )
    }

    render() {
        return (
            <Animated.View style={[styles.container , { opacity : this.state.opacity }]}>
                {this._renderLightbox()}
            </Animated.View>
        )
    }

}

const styles = EStyleSheet.create({
    container : {
        backgroundColor: 'rgba(255,255,255,.5)',
        position: 'absolute',
        top : 0 ,
        bottom : 0,
        left : 0,
        right : 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
