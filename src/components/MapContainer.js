import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places, mapCenter} from './ListPlaces';
import SideBar from './Marker';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            //all the initial points of interest
            places:places,
            //display or hide infowindow
            showingInfoWindow: false,
            //reference the active marker
            activeMarker: {},
            //selected place when clicking on a marker
            selectedPlace: {},
             // Stores the term to filter both markers and list items
            listMarker: '',
            //center when marker listItemClicked
            mapCenter: mapCenter,
}
        this.onClick = this.onClick.bind(this);
    }

    updatelistMarker = (term) => {
       this.setState({ listMarker: term });
     }

    listItemClicked = (placeName) => {
       console.log(placeName);
     }
      getMarkerRef = (ref) => {
       console.log(ref);
     }


    onClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            mapCenter:props.position
        });
    };




    render() {



        return (
            <div className='map-sidebar'>
            <SideBar
            onClickItem={this.onClick}
            selectedPlace={this.state.selectedPlace}
            showingInfoWindow={this.state.showingInfoWindow}
            places={this.state.places}
            listMarker={this.state.listMarker}
            updatelistMarker={this.state.updatelistMarker}
          //  listItemClicked={this.listItemClicked}
            />

                <Map
                google={this.props.google}
                zoom={14}
                initialCenter={places[0].location}
                mapCenter={mapCenter}
                   style={{width: '75%', height: '520px', position: 'fixed', left:'25%'}}
                className={'map'} role={"application"} tabIndex={"0"}>


                    {places.map((place) => (
                        <Marker
                        key={place.id}
                        position={place.location}
                        title={place.name}
                        onClick={this.onClick}
                        ref={this.markerRef}
                        //https://stackblitz.com/edit/react-mu8lid
                        // ref={this.getMarkerRef}
                         >
                        </Marker>
                    ))}

                    <InfoWindow
                        position={this.state.selectedPlace.location}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div className='selectedPlace'>
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
