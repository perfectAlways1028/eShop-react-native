import React from 'react';
import { StatusBar, NetInfo, Alert } from 'react-native';
import { Container , Spinner, Text , View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import styles from './../../assets/styles';
import {setIsConnected} from "../../actions/network";
import {auto_login} from "./api";

class SplashScreen extends React.Component {
    componentDidMount() {


        const dispatchConnected = isConnected => this.props.dispatch(setIsConnected(isConnected));

        NetInfo.isConnected.fetch().then().done(isConnected => {
            dispatchConnected(isConnected)
        });

        NetInfo.isConnected.addEventListener('connectionChange', dispatchConnected);
    }

    render() {
        const style = styles.index;

        if( this.props.isConnected) {
          if(this.props.rehydrated === true) {
            this.CheckUserLogin().then(status => {
              if(status) {
                Actions.reset('root');
              } else {
                Actions.reset('startup');
              }
            });
          }
        } else {
          Alert.alert(
            'not connected!'
          )
        }

        return (
            <Container style={style.splashContainer}>
                <StatusBar backgroundColor="#2c3e50" barStyle="light-content"/>
                <Text style={style.splashText}>آسان پخش</Text>
                <Spinner color={'white'} />
            </Container>
        )
    }

    async CheckUserLogin() {
        try {
            let apiToken = this.props.user.apiToken;
            return apiToken === null
                ? false
                : await auto_login(apiToken);
        } catch(error) {
            console.log(error)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
        rehydrated : state.rehydrated,
        isConnected: state.network.isConnected
    }
}

export default connect(mapStateToProps , null)(SplashScreen);