/* @flow */
import React, { Component } from 'react';
import L from 'leaflet';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Universe } from '../../state';

type Props = {};

const mapOptions = {
    center: [0, 0],
    minZoom: -2,
    maxZoom: 18,
    zoom: 0,
    doubleClickZoom: false,
    preferCanvas: false,
    zoomControl: false,
    crs: L.CRS.Simple
};

const mapStyle = {
    height: '100vh'
};

@observer
export default class MapComponent extends Component {

	map: Object;

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.map = L.map('map-container', mapOptions);
		
		this.forceUpdate();
	}

	componentDidUpdate() {
		const planets = toJS(Universe.planets, false);
		planets.forEach(planet => {
			if(planet.x && planet.y) {
				const coords = L.latLng([planet.y, planet.x]);
				const icon = L.divIcon({ className: 'planet-marker' });
				const marker = L.marker(coords, { icon: icon });

				marker.bindTooltip(planet.name);
				this.map.addLayer(marker);
			}
		});

	}

	componentWillUnmount() {
        this.map.remove();
    }

	render() {

		const planets = Universe.planets;

		return(
			<div style={ mapStyle } id='map-container'></div>
		);
	}

}