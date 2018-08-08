import './index.css'
import 'leaflet'
import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer } from 'react-leaflet'
import { ReactLeafletGroupedLayerControl } from 'react-leaflet-grouped-layer-control'

// My Components
import { ReactLeafletZoomIndicator } from 'react-leaflet-zoom-indicator'
import { ReactLeafletSearch } from 'react-leaflet-search'


const MapContainer = props => <Map
        className="map"
        scrollWheelZoom={false}
        bounds={props.options.bounds}
        maxZoom={props.options.maxZoom}
        maxBounds={props.options.maxBounds}>
        {props.children}
    </Map>

const SeperatorAndLinks = props => <div>
        <hr />
        <h2> {props.title} <small>
            <a href={`https://github.com/tumerorkun/${props.name}`}>github</a>
            <span> - </span>
            <a href={`https://www.npmjs.com/package/${props.name}`}>npm</a>
        </small> </h2>
    </div>

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
        this.baseLayers = [
            {
                name: 'tile-texture-1',
                title: 'OpenStreetMap'
            },
            {
                name: 'tile-texture-2',
                title: 'ThunderForest'
            },
            {
                name: 'tile-texture-3',
                title: 'Esri Map'
            }
        ];
        this.checkedBaseLayerAllTogether = 'tile-texture-1';
        this.checkedBaseLayer = 'tile-texture-2';
        this.exclusiveGroups = [
            'Choropleths',
            'Shapes'
        ]
        this.overlays = [
            {
                checked: true,
                groupTitle: 'Heats',
                name: 'heat-1',
                title: 'Heat'
            },
            {
                checked: false,
                groupTitle: "Grids",
                name: "grid-1",
                title: "Grid"
            },
            {
                checked: true,
                groupTitle: "Choropleths",
                name: "choropleth-1",
                title: "City Choropleth Layer"
            },
            {
                checked: false,
                groupTitle: "Choropleths",
                name: "choropleth-2",
                title: "District Choropleth Layer"
            },
            {
                checked: false,
                groupTitle: "Choropleths",
                name: "None",
                title: "None"
            },
            {
                checked: true,
                groupTitle: "Marker Clusters",
                name: "2g_sites",
                title: "2G-Sites"
            },
            {
                checked: false,
                groupTitle: "Marker Clusters",
                name: "3g_sites",
                title: "3G-Sites"
            },
            {
                checked: false,
                groupTitle: "Marker Clusters",
                name: "4.5g_sites",
                title: "4.5G-Sites"
            }
        ];
        this.overlaysAllTogether = [...this.overlays];
        this.tileLayerUrlAllTogether = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        this.tileLayerUrl = 'http://www.google.cn/maps/vt?lyrs=s@189&gl=tr&x={x}&y={y}&z={z}'
        this.maps = [
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'http://www.google.cn/maps/vt?lyrs=s@189&gl=tr&x={x}&y={y}&z={z}',
            'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ];
    }


    onBaseLayerChangeAllTogether(baseTitle) {
        if (baseTitle === this.checkedBaseLayerAllTogether) { return false; }
        console.warn(baseTitle)
        this.tileLayerUrlAllTogether = this.maps[this.baseLayers.map((e, i) => { return (e.name === baseTitle) ? String(i) : false }).filter(e => e)[0] | 0] || this.maps[0];
        this.checkedBaseLayerAllTogether = baseTitle;
        this.setState({count: ++this.state.count})
    }
    onOverlayChangeAllTogether(newOverlays) {
        this.overlaysAllTogether = [...newOverlays];
        this.forceUpdate();
    }

    onBaseLayerChange(baseTitle) {
        if (baseTitle === this.checkedBaseLayer) { return false; }
        console.warn(baseTitle)
        this.tileLayerUrl = this.maps[this.baseLayers.map((e, i) => { return (e.name === baseTitle) ? String(i) : false }).filter(e => e)[0] | 0] || this.maps[0];
        this.checkedBaseLayer = baseTitle;
        this.setState({count: ++this.state.count})
    }
    onOverlayChange(newOverlays) {
        this.overlays = [...newOverlays];
        this.forceUpdate();
    }

    render (){
        return (
            <div>
                <h1> React Leaflet Component Examples </h1>
                <br />
                <h2> All components together </h2>
                <MapContainer options={this.state}>
                    <TileLayer noWrap={true} url={this.tileLayerUrlAllTogether} />
                    <ReactLeafletZoomIndicator head='zoom:' position='topleft' />
                    <ReactLeafletSearch position="topleft" />
                    <ReactLeafletGroupedLayerControl
                        position="topleft"
                        baseLayers={this.baseLayers}
                        checkedBaseLayer={this.checkedBaseLayerAllTogether}
                        exclusiveGroups={this.exclusiveGroups}
                        overlays={this.overlays}
                        onBaseLayerChange={this.onBaseLayerChangeAllTogether.bind(this)}
                        onOverlayChange={this.onOverlayChangeAllTogether.bind(this)}/>
                </MapContainer>

                    <SeperatorAndLinks title={'Zoom Indicator'} name={'react-leaflet-zoom-indicator'} />

                <MapContainer options={this.state}>
                    <TileLayer noWrap={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ReactLeafletZoomIndicator head='zoom:' position='topleft' />
                </MapContainer>

                    <SeperatorAndLinks title={'Search'} name={'react-leaflet-search'} />

                <MapContainer options={this.state}>
                    <TileLayer noWrap={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ReactLeafletSearch position="topleft" />
                </MapContainer>

                    <SeperatorAndLinks title={'Grouped Layer Control'} name={'react-leaflet-grouped-layer-control'} />
                    <p> handleOverlayChange not implemented on this example but its working </p>

                <MapContainer options={this.state}>
                    <TileLayer noWrap={true} url={this.tileLayerUrl} />
                    <ReactLeafletGroupedLayerControl
                        position="topleft"
                        baseLayers={this.baseLayers}
                        checkedBaseLayer={this.checkedBaseLayer}
                        exclusiveGroups={this.exclusiveGroups}
                        overlays={this.overlays}
                        onBaseLayerChange={this.onBaseLayerChange.bind(this)}
                        onOverlayChange={this.onOverlayChange.bind(this)}/>
                </MapContainer>

                <footer>

                </footer>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
