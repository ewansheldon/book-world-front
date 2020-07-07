import React, {useEffect, useState} from 'react';
import BookInfo from './BookInfo.js';
import {getCountries} from "../api/Requests";

const fetch = require('node-fetch');

const Map = () => {
  let map;
  let hoveredFeature;
  const [book, setBook] = useState();
  const [countries, setCountries] = useState([]);

  const addToken = _ => {
    window.mapboxgl.accessToken = process.env.MAPBOX_TOKEN
  }

  const createMap = _ => {
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

    map = new window.mapboxgl.Map(opts)
  }

  const addCountriesLayer = _ => {
    map.addLayer({
      id: 'countries',
      source: {
        type: 'vector',
        url: 'mapbox://ewansheldon.9m3cbvmj', // <--- Add the Map ID you copied here
      },
      'source-layer': 'ne_10m_admin_0_countries-b8xt27', // <--- Add the source layer name you copied here
      type: 'fill',
      paint: {
        'fill-color': 'pink',
        'fill-opacity': [
          'case',
          ['boolean', ['to-boolean', ['feature-state', 'hover']], true],
          1,
          0
        ]
        // 'fill-opacity': 0
      },
    });

    map.on('click', 'countries', e => {
      let countryCode = e.features[0].properties.ADM0_A3_IS;
      fetch(process.env.API_URL + '/books/' + countryCode)
      .then(response => response.json())
      .then(data => setBook(data));
    })

    map.on('click', _ => {
      setBook(null);
    })
  }

  let addCountriesFilter = _ => {
    map.setFilter(
        'countries',
        ['in', 'ADM0_A3_IS'].concat(countries),
    );
  }

  const createPopup = _ => {
    return new window.mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
  }

  const showPopup = (e, popup) => {
    var coordinates = {lng: e.lngLat.lng, lat: e.lngLat.lat + 2}
    var name = e.features[0].properties.NAME_EN;

    popup.setLngLat(coordinates)
    .setHTML(name)
    .addTo(map);
  }

  function clearPreviousHovers() {
    map.setFeatureState(
        {
          source: 'countries',
          id: hoveredFeature.id,
          sourceLayer: hoveredFeature.sourceLayer
        },
        {hover: false}
    );
  }

  function setNewHover(e) {
    hoveredFeature = e.features[0];
    map.setFeatureState(
        {
          source: 'countries',
          id: hoveredFeature.id,
          sourceLayer: hoveredFeature.sourceLayer
        },
        {hover: true}
    );
  }

  const mouseEnterHandler = popup => {
    map.on('mousemove', 'countries', e => {
      map.getCanvas().style.cursor = 'pointer';
      // showPopup(e, popup)

      if (hoveredFeature) {
        clearPreviousHovers();
      }

      setNewHover(e);
    });
  }

  const mouseLeaveHandler = popup => {
    map.on('mouseleave', 'countries', e => {
      map.getCanvas().style.cursor = '';
      // popup.remove();
      clearPreviousHovers();
    });
  }

  const addHoverHandlers = _ => {
    let popup = createPopup();
    mouseEnterHandler(popup);
    mouseLeaveHandler(popup);
  }

  const onLoadHandlers = _ => {
    map.on('load', _ => {
      map.resize();
      addCountriesLayer();
      addCountriesFilter();
      addHoverHandlers();
    });
  }

  const scriptLoaded = _ => {
    addToken();
    createMap();
    onLoadHandlers();
  }

  const addStylesheet = _ => {
    const link = document.createElement("link");
    link.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  const addMapboxScript = _ => {
    const script = document.createElement("script");
    script.src = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js';
    script.async = true;
    script.id = 'mapbox';
    script.onload = () => scriptLoaded();
    document.head.appendChild(script);
  }

  const addScripts = _ => {
    addMapboxScript();
    addStylesheet();
  }

  useEffect(() => {
    getCountries().then(data => setCountries(data))
  }, [])

  useEffect(() => {
    addScripts();
  }, [countries])

  return (
      <>
        <BookInfo book={book}/>
        <div id='map' className="map"/>
      </>
  );
}

export default Map
