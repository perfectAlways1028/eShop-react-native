import React from 'react';
import Startup from "./User/Startup";
import Home from "./Shop/Home";
import Offers from "./Shop/Offers";
import SplashScreen from "./SplashScreen";
import Signup from "./User/Signup";
import Login from "./User/Login";

export default class Application extends React.Component {

    componentWillMount() {


        setTimeout(() => {
            if(true) {
                this.setState({
                    view : <SplashScreen/>
                })
            } else {
                this.setState({
                    view : <Offers/>
                })
            }
        }, 20000)
    }

    render() {
        return (
            this.state.view
        )
    }
}