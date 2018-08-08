import './index.css'
import 'leaflet'
import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer } from 'react-leaflet'

// My Components
import { ReactLeafletZoomIndicator } from 'react-leaflet-zoom-indicator'
import { ReactLeafletSearch } from 'react-leaflet-search'


const MapContainer = (props) => (
    <Map
        className="map"
        scrollWheelZoom={false}
        bounds={props.options.bounds}
        maxZoom={props.options.maxZoom}
        maxBounds={props.options.maxBounds}>
        <TileLayer noWrap={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {props.children}
    </Map>
)

const SeperatorAndLinks = props => (
    <div>
        <hr />
        <h2> {props.title} <small>
            <a href={`https://github.com/tumerorkun/${props.name}`}>github</a>
            <span> - </span>
            <a href={`https://www.npmjs.com/package/${props.name}`}>npm</a>
        </small> </h2>
    </div>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count:0,
            maxZoom:13,
            maxBounds:[[-90, -180], [90, 180]],
            bounds: [
              {
                lat: 33.100745405144245,
                lng: 24.510498046875,
              },
              {
                lat: 33.100745405144245,
                lng: 46.48315429687501,
              },
              {
                lat: 44.55916341529184,
                lng: 46.48315429687501,
              },
              {
                lat: 44.55916341529184,
                lng: 24.510498046875,
              },
            ],
          }
    }
    render (){
        return (
            <div>
                <h1> React Leaflet Component Examples </h1>
                <br />
                <h2> All components together </h2>
                <MapContainer options={this.state}>
                    <ReactLeafletZoomIndicator head='zoom:' position='topleft' />
                    <ReactLeafletSearch position="topleft" />
                </MapContainer>

                    <SeperatorAndLinks title={'Zoom Indicator'} name={'react-leaflet-zoom-indicator'} />

                <MapContainer options={this.state}>
                    <ReactLeafletZoomIndicator head='zoom:' position='topleft' />
                </MapContainer>

                    <SeperatorAndLinks title={'Seacrh'} name={'react-leaflet-search'} />

                <MapContainer options={this.state}>
                    <ReactLeafletSearch position="topleft" />
                </MapContainer>

                <footer>

                </footer>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
