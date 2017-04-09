import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import merge from 'lodash/merge';
import { GAPIWrapper as Map } from '../Map/MapWrapper';
import './Landmarks.css';

function convertToDataURLviaCanvas(file, callback, outputFormat) {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    callback(reader.result);
  });
  reader.readAsDataURL(file);
}

class Landmarks extends Component {
  constructor() {
    super();

    this.state = {
      landmark: null,
      loading: false,
      openModal: false
    };

    this.uploadedFile = null;
  }

  handleChange = (e) => {
    this.uploadedFile = e.target.files[0];
  };

  handleClick = () => {
    if (this.uploadedFile === null) return;

    this.setState({ loading: true });

    convertToDataURLviaCanvas(this.uploadedFile, (base64Img) => {
      const parts = base64Img.split(";base64,");
      const imgData = parts[parts.length - 1];

      window.fetch('http://f2189154.ngrok.io/api/detects', {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ base64String: imgData })
      }).then(res => res.json())
            .then((res) => {
              console.log("Data from server: ", res);
              if (res.Description) { // found location
                this.setState({
                  loading: false,
                  landmark: {
                    label: res.Description,
                    img: base64Img,
                    position: {
                      lat: res.Latitude,
                      lng: res.Longitude
                    },
                    webpage: res.Webpage,
                    near: res.Respond.results
                  },
                });
              } else {
                this.setState({
                  loading: false,
                  openModal: true
                })
              }

            })
            .catch((err) => {
              console.log("Error: ", err);
            });
    });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handlePostToBlog = () => {
    // TODO: find API requirements and send correct fetch reqest, then .router.push to that blog post
  };

  getPhoto = (ref, selectedPlace) => {
    window.fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyB0RSUpMa9eNn01rzrBbikAdMcFYRWdUqo`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }).then(res => {
      console.log(res);
      return res.body();
    })
          .then((res) => {
            console.log("Data from server: ", res);
            const newNear = this.state.landmark.near.map(place => {
              if (place.id = selectedPlace.id) {
                place.image = res;
              }
            });
            const newLandmark = {
              near: newNear
            };

            this.setState({ landmark: merge(this.state.landmark, newLandmark) })
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
  };

  renderNearByPlace = (place) => {
    const { icon, id, name, photos, rating, vicinity, types, image } = place;

    // (photos && photos[0] && this.getPhoto(photos[0].photo_reference, place));


    return (
      <Card key={id} style={{ display: "inline-block", width: "95%", margin: "10px" }}>
        <CardHeader
          style={{ backgroundColor: "#1B5E20" }}
          title={name}
          subtitle={types.join(", ")}
          avatar={icon}
        />
        <CardTitle title={name} subtitle={vicinity}/>
        {
          rating ?
            <CardText>
              <b>Rating:</b> {rating}
            </CardText>
            :
            null
        }
      </Card>
    )
  };

  renderNearByPlaces = () => {
    const { near, position } = this.state.landmark;

    return (
      <div className="nearByContainer">
        <p className="landmarks-text full"><b>While you are here, you should also see these landmarks that are near
          you!</b></p>
        <div className="nearByList">
          { near.map(this.renderNearByPlace) }
        </div>
        <Map places={near} landmarkPosition={position} />
      </div>
    );
  };

  renderAnswer = () => {
    const { label, webpage, img } = this.state.landmark;

    return (
      <Paper zDepth={5} className="landmarkContainer">
        <div className="landmarkTextContainer">
          <h2 className="landmarks-subtitle">The landmark you asked for is: {label}</h2>
          <p className="landmarkInfo">
            You can find more info about this landmark on this website:
            <span className="landmarkWebSite"><a href={webpage} target="blank">{webpage}</a></span>
          </p>
        </div>
        <img className="landmarkImg" src={img} alt="Landmark"/>

        { this.renderNearByPlaces()}

      </Paper>
    );
  };

  renderUploadForm = () => {
    return (
      <div className="uploadForm">
        <input type="file"
               accept=".jpg,.jpeg,.png,.gif"
               placeholder="Click here to upload your photo..."
               className="fileUpload"
               onChange={this.handleChange}
        />
        <RaisedButton
          primary={true}
          className="uploadButton"
          onClick={this.handleClick}
          label="Upload photo"
        />
      </div>
    );
  };

  renderModal = () => {
    const modalActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        title="Landmark not found"
        actions={modalActions}
        modal={false}
        open={this.state.openModal}
        onRequestClose={this.handleClose}
      >
        <p>
          Unfortunately, we weren't able to detect landmark on your photo. Please try taking new photo and upload it for
          another try.<br />
        </p>
        <p>
          Thank you for having patience with this and we hope you'll succeed with next try!
        </p>
      </Dialog>
    );
  };

  render() {
    return (
      <div className="Landmarks">
        <h1 className="landmarks-title">Discover landmarks around you</h1>
        <p className="landmarks-text">
          Saw a beautiful landmark but don't know what it is? Or you know what it is, but you just want to learn more
          about it? <br /><br/>
          No problem! Just take a picture of it and upload the photo here, and we'll tell you what it is and most
          important
          information about it.
        </p>

        { this.state.loading ?
          <CircularProgress className="landmarks-loader" size={100} thickness={7}/> : this.renderUploadForm() }

        { (this.state.landmark !== null) && this.renderAnswer()}

        { this.renderModal() }

      </div>
    );
  }
}

export default Landmarks;
