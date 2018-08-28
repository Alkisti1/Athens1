import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places, mapCenter} from './ListPlaces';
import SideBar from './SideBar';
//import {getDetails} from '../helpers/FoursquareData'

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
            //the data desplayed for selectedPlace (Foursquare)
            selectedPlaceData:{}
}
//https://www.andreasreiterer.at/bind-callback-function-react/
        this.onClick = this.onClick.bind(this);
        this.updatelistMarker = this.updatelistMarker.bind(this);
        this.getMarkerRef = this.getMarkerRef.bind(this);
        this.listItemClicked = this.listItemClicked.bind(this);
    }
//filter through results in Search Boxx
    updatelistMarker = (query) => {
       this.setState({ listMarker: query });
     }

  onClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            selectedPlaceData: {},
          });
        }
//const placeId = this.state.selectedPlace;
//getDetails(placeId)
//.then(selectedPlaceData => {
  ///this.setState({ selectedPlaceData})
//})
//.catch ('error')

//Click Item on the list to show Infowindow
  listItemClicked = (placeName) => {
const newListMarkers = this.state.markers.filter(marker =>
marker.props.title === placeName);
this.onClick(newListMarkers[0].props, newListMarkers[0].marker);
    };

  getMarkerRef = (ref) => {
    if (ref !== null) {
      this.setState(prevState => ({
        markers: [...prevState.markers, ref]
      }));
    }
  }


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
    // getmarkerRef={this.getMarkerRef}
      />

                <Map
                google={this.props.google}
                zoom={12}
                initialCenter={places[0].location}
                mapCenter={mapCenter}
                style={{width: '75%', height: '520px', position: 'relative', display:'block', float:'right', top:'-520px' }}
                className={'map'} role={"application"} tabIndex={"0"}
                ref={'map'}
                >


                    {places.map((place) => (
                        <Marker
                        key={place.id}
                        placeId={place.id}
                        position={place.location}
                        title={place.name}
                        onClick={this.onClick}
                        listMarker={this.listMarker}
                        //https://stackblitz.com/edit/react-mu8lid
                    ref={this.getMarkerRef}
                         >
                        </Marker>
                    ))}

                    <InfoWindow
                        position={this.state.selectedPlace.location}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        clearData={this.clearData}
                        options={{maxWidth: 200}}
                        >
                        <div className='selectedPlace'>
                            <h3>{this.state.selectedPlace.title}</h3>
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
