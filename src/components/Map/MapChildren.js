import React, { PropTypes } from 'react';
import {
  InfoWindow
} from 'google-maps-react';
import landmarkIcon from '../../../public/landmarkIcon.png';
import {
  Marker,
} from './Marker';


export default class MapChildren extends React.Component {


  renderMarker = (place) => {
    const { map, google, mapCenter } = this.props;

    return (
      <Marker
        google={google} map={map} mapCenter={mapCenter}
        key={place.id}
        ref={place.name}
        place={place}
        position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
        onClick={this.props.onMarkerClick}
      />
    );
  };

  render() {
    const { places, google, map, mapCenter, activeMarker, selectedPlace, showingInfoWindow, onInfoWindowClose, landmarkPosition } = this.props;
    
    if (!places || places.length === 0) return null;
    
    return (
      <div>
        { places.map(this.renderMarker) }

        <Marker
          google={google} map={map} mapCenter={mapCenter}
          key={Date.now()}
          position={landmarkPosition}
          icon={landmarkIcon}
        />

        <InfoWindow
          google={google} map={map} mapCenter={mapCenter}
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onInfoWindowClose}
        >
          <div className="infoWindow">
            <h3 className="infoWindow-title">{selectedPlace.name}</h3>
            <p className="infoWindow-text"><b>Address:</b> {selectedPlace.vicinity}</p>
            <p className="infoWindow-text"><b>Rating:</b> {selectedPlace.rating}</p>
          </div>
        </InfoWindow>
      </div>
    );
  }
}

MapChildren.propTypes = {
  map: PropTypes.object,
  google: PropTypes.object,
  mapCenter: PropTypes.object,
  places: PropTypes.array,
  onMarkerClick: PropTypes.func.isRequired,
};