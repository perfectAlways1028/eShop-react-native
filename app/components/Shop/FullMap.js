import React from 'react';
import {Image, TouchableHighlight, Alert, Dimensions} from 'react-native';
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
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const latitudeDelta = 0.0922;
const longitudeDelta = latitudeDelta * ASPECT_RATIO;
const mapStyle=[
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e4e4e4"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f0f0f0"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e9ffb2"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cacaca"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#18bfd1"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }
];
const pageTitle = 'انتخاب فروشگاه';
/*let latitude = 29.6761649;
let longitude = 52.4587735;*/

let latitude = 29.600238;
let longitude = 52.565245;


class Map extends React.Component {

    constructor (props) {
        super(props);
        /*this.getMapMarkers(latitude,longitude);
        this.setState ({
            initialRender: true,
            region : {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            },
            markers : []
        });*/

    }

    componentDidMount() {

    }

    componentWillMount() {

        this.getMapMarkers(latitude,longitude);

        this.setState ({
            initialRender: true,
            regionSet: false,
            region : {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            },
            markers : []
        });

    }

    onRegionChange = (region) => {
        if (!this.state.regionSet) return;
        this.setState({
            region
        });
        this.setState({ regionSet: false });
    }

    render() {
        return (
            <Container>
                <MainHeader title={pageTitle} />
                <MapView.Animated
                    style={{ flex : 1 }}
                    region={this.state.region}
                    showsTraffic={false}
                    showsUserLocation={true}
                    customMapStyle={mapStyle}
                    onLongPress={this.makeMarker.bind(this)}
                    onRegionChange={this.onRegionChange.bind(this)} //causes wrong map movements
                    ref={el => {this.animatedMap = el; }}
                    onMapReady={() => {
                        this.setState({ regionSet: true });
                    }}
                    //onLayout={() => this.animatedMap.fitToCoordinates(this.state.markers, { edgePadding: { top: 50, right: 10, bottom: 10, left: 10 }, animated: false })} >
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
        } else if (marker.pintype==0) {
            pinImages = Images.PinShop0;
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

                //return json.markers;
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