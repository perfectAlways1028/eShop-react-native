import React from 'react';
import {Image, TouchableHighlight, Alert} from 'react-native';
import {Container, Header, Right, Button, Content, Text, Left, Icon , View , Spinner , Fab} from 'native-base';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import MainHeader from "../Shared/MainHeader";
import { base, categories } from './../../assets/styles';
import {connect} from "react-redux";
import store from "./../../store/configuteStore";
import {setVendor} from "../../actions/index";

// Images
import Images from './../../assets/Images';
import {elements} from "../../assets/styles/index";

const pageTitle = 'انتخاب فروشگاه';
let latitude = 29.6761649;
let longitude = 52.4587735;

class Map extends React.Component {


    componentWillMount() {

        this.getMapMarkers(latitude,longitude)

        this.setState ({
            initialRender: true,
            region : {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers : [
                {
                    coordinates : {
                        latitude: 29.6790636,
                        longitude: 52.4549763
                    },
                    title: 'فروشگاه تارا',
                    description: 'عرضه کننده انواع خواروبار',
                    address: 'معالی آباد، کوی پزشکان، خیابان سوم',
                    cover: 'سراسر شیراز',
                    stars: 2.5,
                    pintype: 1,
                    vendor:1,
                },
                {
                    coordinates : {
                        latitude: 29.659486,
                        longitude: 52.4560013
                    },
                    title: 'سبزی مارکت فرهنگشهر',
                    description: 'عرضه کننده انواع سبزیجات نیمه آماده',
                    address: 'فرهنگشهر، کوی زنبق',
                    cover: 'تا شعاع 10 کیلومتری',
                    stars: 2.5,
                    pintype: 3,
                    vendor:2,
                },
                {
                    coordinates : {
                        latitude: 29.6726216,
                        longitude: 52.4550013
                    },
                    title: 'فروشگاه من و تو',
                    description: 'عرضه کننده انواع خواروبار',
                    address: 'فرهنگشهر، ایستگاه 17',
                    cover: 'تا شعاع 5 کیلومتری',
                    stars: 2.5,
                    pintype: 2,
                    vendor:3,
                },
                {
                    coordinates : {
                        latitude: 29.6840636,
                        longitude: 52.4687508
                    },
                    title: 'فروشگاه اکبر',
                    description: 'عرضه کننده انواع خواروبار',
                    address: 'کوی خلبانان - اول سیمتری',
                    cover: 'تا شعاع 2 کیلومتری',
                    stars: 2.5,
                    pintype: 2,
                    vendor:4,
                }
            ]
        });

    }

    onRegionChange = (region) => {
        if (!this.state.regionSet) return;
        this.setState({
            region
        });
    }


    render() {
        return (
            <Container>
                <MainHeader title={pageTitle} />
                <MapView.Animated
                    style={{ flex : 1 }}
                    region={this.state.region}
                    showsTraffic={true}
                    showsUserLocation={true}
                    onLongPress={this.makeMarker.bind(this)}
                    //onRegionChange={this.onRegionChange.bind(this)} //causes wrong map movements
                    ref={el => {this.animatedMap = el; }}
                    onMapReady={() => {
                        this.setState({ regionSet: true });
                    }}
                >
                    {
                        this.state.markers.map(this.renderMarker.bind(this))
                    }

                </MapView.Animated>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: 'rgba(255,255,255,.9)' }}
                    onPress={this.getCurrentPosition.bind(this)}
                    position="bottomRight">
                    <Icon name="md-locate" style={{color:'#852c50'}} />
                </Fab>
            </Container>
        )
    }


    makeMarker({ nativeEvent }) {
        const pos = nativeEvent.coordinate;
        this.setState(prevState => {
            return {
                markers: [
                    ...prevState.markers,
                    {
                        latitude: pos.latitude,
                        longitude: pos.longitude,
                    }
                ]
            }
        })
    }

    renderMarker(marker , index) {
        //const pinImage = Images.PinShop1;
        var pinImages = '';
        if (marker.pintype==1) {
            pinImages = Images.PinShop1;
        } else if (marker.pintype==2) {
            pinImages = Images.PinShop2;
        } else {
            pinImages = Images.PinShop3;
        }

        const pinImage = pinImages;

        return (
            <MapView.Marker key={index}  title={marker.title} description={marker.description} coordinate={marker.coordinates}>
                <Image
                    source = {pinImage} style={elements.mapPin}
                    onLayout={() => this.setState({ initialRender: false })}
                    key={`${this.state.initialRender}`}
                />
                <MapView.Callout tooltip onPress = {()=>this.getVendorRequest(marker.vendor)}>
                        <View style={{height:120, width:280, borderWidth:1,borderRadius:5, borderColor:'#ccc', padding:5,  backgroundColor:'rgba(255,255,255,0.99)'}}>
                            <View style={{backgroundColor:'#efefef', borderRadius:2, paddingTop:2, paddingBottom:5, marginBottom:10, paddingRight:10}}>
                                <Text style={[base.boldPrimary]} >{marker.title}</Text>
                            </View>
                            <Text  style={base.mediumText}>{marker.description}</Text>
                            <Text  style={base.smallText}>{marker.address}</Text>
                            <Text  style={base.smallText}>محدوده سرویس دهی: {marker.cover}</Text>
                            <Image source={Images.stars35} resizeMode={'cover'} style={{height:13, width:60}}/>
                        </View>
                </MapView.Callout>
            </MapView.Marker>
        )
    }

    getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position.coords);
                this.setState({position: initialPosition});
                let tempCoords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                this.animatedMap._component.animateToCoordinate(tempCoords, 3);
                //this._map.animateToCoordinate(tempCoords, 1);
            }, function (error) { alert(error) },
        );
    }



    async getVendorRequest(vid) {

        let token = '123455';
        let item_type = 'store';
        try {

            let response = await fetch('http://asanpakhsh.com/api/fetch', {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    item_type,
                    vid,
                    token
                })
            });
            let json = await response.json();

            if(response.status === 200) {
                // set vendor in store
                this.props.setVendor(json.data);
                Actions.reset('root');
            }
            if(response.status === 422) {
                // Validate
                console.log('validate');
            }

            if(response.status === 302) {
                // Auth
                console.log('home')
            }

        } catch(error) {
            console.log(error);
        }
    }

    async getMapMarkers(lat, lng) {

        let token = '123455';
        let item_type = 'marker';
        try {

            let response = await fetch('http://asanpakhsh.com/api/fetch', {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    item_type,
                    lat,
                    lng,
                    token
                })
            });
            let json = await response.json();

            if(response.status === 200) {
                // set vendor in store

                this.setState({
                    markers: json.markers
                });

                console.log(this.state);
            }
            if(response.status === 422) {
                // Validate
                console.log('validate');
            }

            if(response.status === 302) {
                // Auth
                console.log('home')
            }

        } catch(error) {
            console.log(error);
        }
    }

}


const mapDispatchToProps = dispatch => {
    return {
        setVendor : vendor => {
            dispatch(setVendor(vendor))
        }
    }
}

export default connect(null,mapDispatchToProps)(Map)