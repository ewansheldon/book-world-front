import React, { Component } from 'react';
import { addScripts } from '../lib/map';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = _ => {
    addScripts();
  }

  render = _ => {
    return (
      <div id='map' className="map"></div>
    )
  }
}

export default Map
