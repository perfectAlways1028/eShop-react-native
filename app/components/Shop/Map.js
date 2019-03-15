import React from 'react';
import {Image, TouchableOpacity, Alert, Dimensions, ScrollView} from 'react-native';
import {Container, Header, Right, Button, Content, Text, Left, Icon , View , Spinner , Fab} from 'native-base';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import MainHeader from "../Shared/MainHeader";
import { base, categories, elements, drawer } from './../../assets/styles';
import {connect} from "react-redux";
import store from "./../../store/configuteStore";
import {setVendor} from "../../actions/index";
import * as Animatable from 'react-native-animatable';

import { get_address } from './../Root/api.js';

// Images
import Images from './../../assets/Images';
import Loading from "../Shared/Loading";
import {_e} from "../../lang";
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
let lang = 'en';


let latitude = 29.600238;
let longitude = 52.565245;
let currentMarkerIndex = 0;
let favAddresses = [
    {
      'key':1,
        'title':'fav title 1',
      'lat': 29.600238,
      'lng': 52.565245
    },
    {
        'key':2,
        'title':'fav title 2',
        'lat': 29.600238,
        'lng': 52.565245
    },
    {
        'key':3,
        'title':'fav title 3',
        'lat': 29.600238,
        'lng': 52.565245
    },
    {
        'key':4,
        'title':'fav title 4',
        'lat': 29.600238,
        'lng': 52.565245
    },
    {
        'key':5,
        'title':'fav title 5',
        'lat': 29.600238,
        'lng': 52.565245
    },
    {
        'key':6,
        'title':'fav title 6',
        'lat': 24.600238,
        'lng': 51.565245
    },
    {
        'key':7,
        'title':'fav title 7',
        'lat': 27.700238,
        'lng': 53.505245
    },
    {
        'key':8,
        'title':'fav title 8',
        'lat': 29.600238,
        'lng': 53.665245
    },
];
class Map extends React.Component {
    constructor (props) {
        super(props);
        this.getCurrentPosition = this.getCurrentPosition.bind(this);
        this.state = {
            position: null
        };
        //this.renderProduct = this.renderProduct.bind(this);
    }

    componentWillMount() {
        //this.getMapMarkers(latitude,longitude);

        this.setState ({
            initialRender: true,
            loading:false,
            regionSet: true,
            region : {
                latitude: 0,
                longitude: 0,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            },
            markers : [],
            showCancel: false,
            loadingIndicator : false,
            currentMarkerIndex : -1,

            address: "address from google maps",
            loading: true
        });

        this.setState({ loading: false });
        navigator.geolocation.getCurrentPosition((position) => {
            var initialPosition = JSON.stringify(position.coords);
            this.setState({position: initialPosition});
            
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                }
            });

            this.getAddress(position.coords.latitude, position.coords.longitude);
            this.setState({ loading: true });
        }, function (error) { alert(error) }, );
    }

    componentDidMount() {
        this.getCurrentPosition();
    }

    getAddress(lat, lng) {
        get_address(lat.toString(), lng.toString())
        .then((response) => {
            if (!response.address) { return; }
            this.setState({ address: response.address });
        });
    }

    navigateToAddress(latitude, longitude) {
        let favCoords = {
            latitude:latitude,
            longitude: longitude,
        }
        this.animatedMap._component.animateToCoordinate(favCoords, 1000);
    }

    onRegionChangeComplete = (region) => {
        if (this.state.regionSet) {
            this.setState({ regionSet: false });
            return;
        }

        this.getAddress(region.latitude, region.longitude);
        
        this.setState({ region });
    }

    render() {
        return  (
            <Container>
                <MainHeader title={_e[global.lang].where_are_you} />
                <ScrollView ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight)=>{
                                this.scrollView.scrollToEnd({animated: false});
                            }} horizontal={true} showsHorizontalScrollIndicator={false}
                            contentContainerStyle={favAddresses.length<6?categories.shortList:''}
                            style={elements.mapFavBar}
                >
                    {Object.keys(favAddresses).map((item)=> {
                        return (
                            <View key={item}>
                                <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress={()=>this.navigateToAddress(favAddresses[item].lat, favAddresses[item].lng)}>
                                    <Text style={elements.mapFavText} key={item}>{favAddresses[item].title}</Text>
                                    <Icon name="md-star" style={elements.mapFavStars}/>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
                { this.state.loading == true ?
                    <MapView.Animated
                        onPress={
                            (e) => {
                                e.stopPropagation();
                                //this.state.showCancel ? this.setState({ showCancel: false }) : null
                            }}
                        style={{ flex : 1 }}
                        region={this.state.region}
                        showsTraffic={false}
                        showsUserLocation={true}
                        customMapStyle={mapStyle}
                        onLongPress={this.makeMarker.bind(this)}
                        // onRegionChange={this.onRegionChange.bind(this)} //causes wrong map movements
                        onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                        ref={ref => {this.animatedMap = ref; }}
                        onMapReady={() => { this.setState({ regionSet: true }); }}
                    >
                        { this.state.markers.map(this.renderMarker.bind(this)) }
                    </MapView.Animated>
                :
                    <View/>
                }

                <View  style={elements.fob}>
                    <Icon onPress={this.getCurrentPosition.bind(this)} name="md-locate" style={{color:'#852c50'}} />
                </View>

                {
                    this.showPin()
                }

                <View style={elements.mapFooter}>
                    <Text style={base.mediumText}>{_e[lang].your_location}:</Text>
                    <Text style={base.mediumSmallerText}> [{ this.state.address }] </Text>
                </View>
        </Container>
        )
    }


    showPin() {
        let pinImage = Images.Pin;
        let pinLeft = width / 2 - 35;
        let pinTop = 60 + (height - 60) / 2 - 70;

        return (
            <TouchableOpacity style={[elements.mapPin, {position:'absolute', left:pinLeft, top:pinTop}]} onPress={()=>Actions.replace('shops_nearby',{map_click:'1'})}>
                <View >
                    <Image style={[elements.mapPin]}
                        source = {pinImage}
                    ></Image>
                </View>
            </TouchableOpacity>


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
            <MapView.Marker key={index}
                            coordinate={marker.coordinates}
                            onPress={(e) => {
                                e.stopPropagation()
                                //this.setState({ showCancel: true } )
                            }}>
                <Image
                    source = {pinImage} style={elements.mapPin}
                    onLayout={() => this.setState({ initialRender: false })}
                    key={`${this.state.initialRender}`}
                />

            </MapView.Marker>
        )
    }

    getCurrentPosition() {

        if (!this.state.loading) { return; }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                
                var initialPosition = JSON.stringify(position.coords);

                this.setState({position: initialPosition});
                console.log(this.state.position);
                let tempCoords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                this.animatedMap._component.animateToCoordinate(tempCoords, 2000);
                //this._map.animateToCoordinate(tempCoords, 1);
            }, function (error) { alert(error) },
        );
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