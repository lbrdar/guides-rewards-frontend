import React, { PropTypes } from 'react';
import {
  Map,
  GoogleApiWrapper
} from 'google-maps-react';
import MapChildren from './MapChildren';
import './Map.css';


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      zoom: 15,
      place: {},
      open: false,
    };
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props.place,
      activeMarker: marker,
      showingInfoWindow: true,
      zoom: (this.state.zoom < 10) ? 10 : this.state.zoom
    });
  };

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  };

  render() {
    const {  places, google, landmarkPosition } = this.props;
    const { center, zoom, activeMarker, showingInfoWindow, selectedPlace } = this.state;

    return (
      <div className="mapWrapper">
        <Map
          google={google}
          containerStyle={{ height: '60vh' }}
          className="mapContainerStyle"
          visible={false}
        >
            <Map
              google={google}
              initialCenter={landmarkPosition}
              center={center}
              containerStyle={{ height: '60vh' }}
              className="map"
              zoom={zoom}
              centerAroundCurrentLocation={false}
            >

              <MapChildren
                places={places}
                landmarkPosition={landmarkPosition}
                onMarkerClick={this.onMarkerClick}
                onInfoWindowClose={this.onInfoWindowClose}
                activeMarker={activeMarker}
                showingInfoWindow={showingInfoWindow}
                selectedPlace={selectedPlace}
              />
            </Map>
        </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {
  step: PropTypes.string,
  currentlySetLocation: PropTypes.object,
  storesConnection: PropTypes.object,
  google: PropTypes.object,
  selected: PropTypes.object,
  positionSet: PropTypes.bool,
  fitMap: PropTypes.bool,       // eslint-disable-line react/no-unused-prop-types
  loading: PropTypes.bool,      // eslint-disable-line react/no-unused-prop-types
  setUserPosition: PropTypes.func,
  setFitMap: PropTypes.func,
  handleBoundsChanged: PropTypes.func,
  handleMarkerClick: PropTypes.func,
  checkIsFullAddress: PropTypes.func,
  viewer: PropTypes.object,
  quote: PropTypes.object,
  closeModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
  isViewMenu: PropTypes.bool,
  latitude: PropTypes.any,
  longitude: PropTypes.any
};

MapContainer.defaultProps = {
  step: 'location',
  currentlySetLocation: null,
  storesConnection: null,
  google: null,
  selected: null,
  positionSet: false,
  fitMap: false,
  loading: false,
  viewer: null,
  quote: null,
  isModalOpen: false,
  isViewMenu: false,
  latitude: null,
  longitude: null
};

export const GAPIWrapper = GoogleApiWrapper({
  apiKey: 'AIzaSyB0RSUpMa9eNn01rzrBbikAdMcFYRWdUqo',
  version: '3.26',
  libraries: ['places', 'geometry']
})(MapContainer);