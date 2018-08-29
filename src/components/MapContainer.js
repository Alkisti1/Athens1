import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places, mapCenter} from './ListPlaces';
import SideBar from './SideBar';
import {clientID, clientSecret, version} from '../helpers/FoursquareData'

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
        this.onInfoWindowClose=this.onInfoWindowClose.bind(this);
        this.updatelistMarker = this.updatelistMarker.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.getMarkerRef = this.getMarkerRef.bind(this);
    }
//filter through results in Search Box
    updatelistMarker = (query) => {
       this.setState({ listMarker: query});
     }
//fetch foursquare FoursquareData
getDetails= (placeInfo) => {
  this.setState({ selectedPlaceData: placeInfo})
}

  onClick = (props, marker, e) => {
//reference the newListMarkers
const markersBounce = this.state.markers;
//make the marker that is clicked bounce and stop the rest of  the markers from bouncing
markersBounce.forEach(m => {
  if (m.marker.title === marker.title) {
    m.marker.setAnimation(1);
  } else {
    m.marker.setAnimation(null);
  }
})
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            selectedPlaceData: {},
          });
//fetch foursquare data
const fsData = marker.placeId;

        fetch(`https://api.foursquare.com/v2/venues/${fsData}?&client_id=${clientID}&client_secret=${clientSecret}&v=${version}`)
        .then(response => response.json())
        .catch(err => console.log('Couldn\'t retrieve venue details with ', err))
        .then(data => {
const placesInfo = data.response.venue;
console.log(data.response.venue)        })

    }

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
//Set bouncing animation to null when infowindow closes
//https://github.com/fullstackreact/google-maps-react/blob/master/examples/components/clickableMarkers.js

onInfoWindowClose= () => {
  const markersBounce = this.state.markers;
markersBounce.forEach(m => m.marker.setAnimation(null))
this.setState({
  activeMarker: null,
    showingInfoWindow: false,
    selectedPlaceData: {},
})
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

{/*map the list of places to create marker and filter through list places to show/hide marker*/}
                    {places.filter (place => {
                      return place.name.toLowerCase().indexOf(this.state.listMarker.toLowerCase()) >= 0;
                    })
                    .map((place) => (
                        <Marker
                        key={place.id}
                        placeId={place.id}
                        position={place.location}
                        title={place.name}
                        onClick={this.onClick}
                        //https://stackblitz.com/edit/react-mu8lid
                    ref={this.getMarkerRef}
                    clearMarker={this.clearMarker}

                         >
                        </Marker>
                    ))}

                    <InfoWindow
                        position={this.state.selectedPlace.location}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onInfoWindowClose}
                        //clearMarker={this.clearMarker}
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
