import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {places, mapCenter} from './ListPlaces';
import SideBar from './SideBar';
import MapStyles from '../helpers/MapStyles';
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
            selectedPlaceData:{},
            //display an error message when fs data are not available
            errorFs:''
}
//https://www.andreasreiterer.at/bind-callback-function-react/
        this.onClick = this.onClick.bind(this);
        this.onInfoWindowClose=this.onInfoWindowClose.bind(this);
        this.updatelistMarker = this.updatelistMarker.bind(this);
        this.getMarkerRef = this.getMarkerRef.bind(this);
    }
//filter through results in Search Box when typing
    updatelistMarker = (query) => {
       this.setState({ listMarker: query});
     }

//activate marker and infowindow (google-maps-react)
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
    });
        this.setState({
          //set a refernce to map (google-maps-react)
            selectedPlace: props,
            //set active marker
            activeMarker: marker,
            //showing infowindow
            showingInfoWindow: true,
            //clear selectedPlaceData
            selectedPlaceData: {},
            //Display error message when fetching foursquare fsData
            errorFs:false,
          });

//fetch foursquare data onClick and catch errors
const fsData = marker.placeId;
        const self= this;
        fetch(`https://api.foursquare.com/v2/venues/${fsData}?&client_id=${clientID}&client_secret=${clientSecret}&v=${version}`)
        .then((response) => {
          console.log(response);
          if(response.status === 429) {
            self.setState({errorFs: true});
            return;
          }
          return response.json()
        })
        .then((data) => {
          if (data) {
              console.log(data);
              const placesInfo = data.response.venue;
              if (placesInfo.rating) {
                this.setState({selectedPlaceData:placesInfo})
                console.log(data.response.venue)
              } else {
                this.setState({errorFs: true})
              }
            }
        })
        .catch((err) => {
          console.log(err);
           this.setState({errorFs:  true});
        })

    }

//Click Item on the list associate it with Marker and show Infowindow and call onCLick function
  listItemClicked = (placeName) => {
const newListMarkers = this.state.markers.filter(marker =>
marker.props.title === placeName);
this.onClick(newListMarkers[0].props, newListMarkers[0].marker);
    };
//Getting all markers using ref and pushing them all to the state.markers.array
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
      <div className="container">
      <div className='map-sidebar'>

      <SideBar

      onClick={this.onClick}
      selectedPlace={this.state.selectedPlace}
      showingInfoWindow={this.state.showingInfoWindow}
      places={this.state.places}
      listMarker={this.state.listMarker}
      updatelistMarker={this.updatelistMarker}
      listItemClicked={this.listItemClicked}
      />
</div>
<div className='map-container'>
                <Map
                google={this.props.google}
                zoom={13.5}
                initialCenter={places[0].location}
                mapCenter={mapCenter}
                style={{width: '75%', height: '620px', position: 'relative', display:'flex', float:'right', top:'-620px' }}
                styles ={MapStyles}
                mapElement={<main className={'map'} role={"application"} tabIndex={"0"}></main>}
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
                        selectedPlaceData={this.state.selectedPlaceData}
                        errorFs={this.state.errorFs}
                        options={{maxWidth: 200}}
                        >
                        <section className='selectedPlace' tabIndex='0' key={this.state.selectedPlace.id}>
                            <h3>{this.state.selectedPlace.title}</h3>
                        {this.state.errorFs ?
                                    <p>Cannot fetch data from Foursquare!</p>
                        :
                          <article>
                          <p>The rating is: {this.state.selectedPlaceData.rating}</p>
                          <div>
                          <a className="details-more" href={this.state.selectedPlaceData.canonicalUrl} aria-label="More at Foursquare">
                          Read more on Foursquare
                          </a>
                          </div>
                          </article>
                        }
                        </section>
                    </InfoWindow>
                </Map>


            </div>
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
