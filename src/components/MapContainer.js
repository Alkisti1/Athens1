import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places} from './ListPlaces';

export class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    render() {

        return (
            <div className="main-container">
                <Map google={this.props.google} zoom={14} initialCenter={places[0].location}>

                    {places.map((place) => (
                        <Marker position={place.location} title={place.name} onClick={this.onClick}></Marker>
                    ))}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.title}</h1>
                        </div>
                        {/*<FoursquareContainer place={this.selectedPlace}></FoursquareContainer>*/}
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

const LoadingContainer = (props) => (
    <div>loading container!</div>
)

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCmtVWzHG114vmGdU3KbPOUnpnP6l2ju-s',
    language: 'el',
    LoadingContainer: LoadingContainer
})(MapContainer)
