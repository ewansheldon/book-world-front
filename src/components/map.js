import React, {Component} from 'react';
import BookInfo from './bookInfo.js';
const fetch = require 'node-fetch';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: null,
            countries: []
        }
    }

    addToken = _ => {
        window.mapboxgl.accessToken = process.env.MAPBOX_TOKEN
    }

    createMap = _ => {
        let opts = {
            container: 'map',
            style: 'mapbox://styles/ewansheldon/ck3qbiage0lvy1cmmw1noxcx8',
            center: [0, 40],
            zoom: 2,
            minZoom: 2,
            maxZoom: 4,
            width: window.innerWidth,
            height: window.innerHeight,
            navigationControl: {
                showZoom: true
            },
            dragRotate: false
        }

        this.map = new window.mapboxgl.Map(opts)
    }

    addCountriesLayer = _ => {
        this.map.addLayer({
            id: 'countries',
            source: {
                type: 'vector',
                url: 'mapbox://ewansheldon.9m3cbvmj', // <--- Add the Map ID you copied here
            },
            'source-layer': 'ne_10m_admin_0_countries-b8xt27', // <--- Add the source layer name you copied here
            type: 'fill',
            paint: {
                'fill-color': 'pink', //this is the color you want your tileset to have (I used a nice purple color)
                'fill-outline-color': '#F2F2F2', //this helps us distinguish individual countries a bit better by giving them an outline
            },
        });

        this.map.on('click', 'countries', e => {
            let countryCode = e.features[0].properties.ADM0_A3_IS;
            fetch(process.env.API_URL + '/books/' + countryCode)
                .then(response => response.json())
                .then(data => this.setState({book: data}));
        })

        this.map.on('click', e => {
            this.setState({book: null});
        })
    }

    addCountriesFilter = _ => {
        this.map.setFilter(
            'countries',
            ['in', 'ADM0_A3_IS'].concat(this.state.countries),
        );
    }

    createPopup = _ => {
        return new window.mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
    }

    mouseEnterHandler = popup => {
        this.map.on('mousemove', 'countries', e => {
            this.map.getCanvas().style.cursor = 'pointer';
            var coordinates = {lng: e.lngLat.lng, lat: e.lngLat.lat + 2}
            var name = e.features[0].properties.NAME_EN;

            popup.setLngLat(coordinates)
                .setHTML(name)
                .addTo(this.map);
        });
    }

    mouseLeaveHandler = popup => {
        this.map.on('mouseleave', 'countries', _ => {
            this.map.getCanvas().style.cursor = '';
            popup.remove();
        });
    }

    addPopupLayer = _ => {
        let popup = this.createPopup();
        this.mouseEnterHandler(popup);
        this.mouseLeaveHandler(popup);
    }

    onLoadHandlers = _ => {
        this.map.on('load', _ => {
            this.map.resize();
            this.addCountriesLayer();
            this.addCountriesFilter();
            this.addPopupLayer();
        });
    }

    scriptLoaded = _ => {
        let mapboxgl;
        let map;

        this.addToken();
        this.createMap();
        this.onLoadHandlers();
    }

    addStylesheet = _ => {
        const link = document.createElement("link");
        link.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    addMapboxScript = _ => {
        const script = document.createElement("script");
        script.src = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js';
        script.async = true;
        script.id = 'mapbox';
        script.onload = () => this.scriptLoaded();
        document.head.appendChild(script);
    }

    addScripts = _ => {
        this.addMapboxScript();
        this.addStylesheet();
    }

    componentDidMount = _ => {
        fetch(process.env.API_URL + '/countries')
            .then(response => response.json())
            .then(data => this.setState({countries: data}));
        this.addScripts();
    }

    render = _ => {
        return (
            <>
                <BookInfo book={this.state.book}/>
                <div id='map' className="map"></div>
            </>
        )
    }
}

export default Map
