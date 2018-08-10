import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places, mapCenter} from './ListPlaces';
import SideBar from './SideBar';

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
            //all markers on the map
            markers:[],
            //the data desplayed for selectedPlace
            selectedPlaceData:{}
}
//https://www.andreasreiterer.at/bind-callback-function-react/
        this.onClick = this.onClick.bind(this);
        this.updatelistMarker=this.updatelistMarker.bind(this);
        this.getMarkerRef=this.getMarkerRef.bind(this);
    }
//filter through results in Search Boxx
    updatelistMarker = (query) => {
       this.setState({ listMarker: query });
     }
//Click Item on the list to show Infowindow
  listItemClicked = (placeName) => {
    console.log(placeName);
    };

     getMarkerRef = (ref) => {
        console.log(ref)
         }


  onClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            selectedPlaceData: {}
          });

    //    clearData = () => {
    // this.setState({
    //  showingInfoWindow: false,
    //   activeMarker: null
    // });
 //}
    };

  render() {
    return (
            <div className='map-sidebar'>
            <SideBar
            onClick={this.onClick}
            selectedPlace={this.state.selectedPlace}
            showingInfoWindow={this.state.showingInfoWindow}
            places={this.state.places}
            listMarker={this.state.listMarker}
            updatelistMarker={this.updatelistMarker}
            listItemClicked={this.listItemClicked}
        //  getmarkerRef={this.getMarkerRef}

            />

                <Map
                google={this.props.google}
                zoom={14}
                initialCenter={places[0].location}
                mapCenter={mapCenter}
                style={{width: '75%', height: '520px', position: 'fixed', left:'25%'}}
                className={'map'} role={"application"} tabIndex={"0"}
                //markerRef={this.getMarkerRef}
                >


                    {places.map((place) => (
                        <Marker
                        key={place.id}
                        position={place.location}
                        title={place.name}
                        onClick={this.onClick}
                        listMarker={this.listMarker}
                        //https://stackblitz.com/edit/react-mu8lid
                      markerRef={this.getMarkerRef}
                         >
                        </Marker>
                    ))}

                    <InfoWindow
                        position={this.state.selectedPlace.location}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        clearData={this.clearData}
                        //markerRef={this.getMarkerRef}


                        >
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
