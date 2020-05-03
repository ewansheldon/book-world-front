let scriptLoaded = _ => {
  let mapboxgl;
  let map;

  let addToken = _ => {
    mapboxgl = window.mapboxgl;
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN
  }

  let createMap = _ => {
    let opts = {
      container: 'map',
      style: 'mapbox://styles/ewansheldon/ck3qbiage0lvy1cmmw1noxcx8',
      center: [0,40],
      zoom: 2,
      width: window.innerWidth,
      height: window.innerHeight,
      navigationControl: {
        showZoom: true
      },
      dragRotate: false
    }

    map = new mapboxgl.Map(opts)
  }

  let onLoadHandlers = _ => {
    let addCountriesLayer = _ => {
      map.addLayer({
        id: 'countries', //this is the name of our layer, which we will need later
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
    }

    let addCountriesFilter = _ => {
      map.setFilter(
        'countries',
        ['in', 'ADM0_A3_IS'].concat(['JPN', 'GRC', 'GBR', 'PRT', 'ESP', 'AUS']),
      );
    }

    let addPopupLayer = _ => {

      let createPopup = _ => {
        return new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });
      }

      let mouseEnterHandler = popup => {
        map.on('mouseenter', 'countries', e => {
          map.getCanvas().style.cursor = 'pointer';
          var coordinates = e.lngLat;
          var name = e.features[0].properties.NAME_EN;

          popup.setLngLat(coordinates)
            .setHTML(name)
            .addTo(map);
        });
      }

      let mouseLeaveHandler = popup => {
        map.on('mouseleave', 'countries', _ => {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      }

      let popup = createPopup();
      mouseEnterHandler(popup);
      mouseLeaveHandler(popup);
    }

    map.on('load', _ => {
      map.resize();
      addCountriesLayer();
      addCountriesFilter();
      addPopupLayer();
    });
  }

  addToken();
  createMap();
  onLoadHandlers();
}

let addScripts = _ => {
  let addStylesheet = _ => {
    const link = document.createElement("link");
    link.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  let addMapboxScript = _ => {
    const script = document.createElement("script");
    script.src = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js';
    script.async = true;
    script.id = 'mapbox';
    script.onload = () => scriptLoaded();
    document.head.appendChild(script);
  }

  addMapboxScript();
  addStylesheet();
}

export { addScripts }
