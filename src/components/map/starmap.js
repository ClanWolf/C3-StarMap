/* @flow */
import React, { Component } from 'react';
import L from 'leaflet';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { SystemsLayer, SpheresLayer } from './';
import { Universe, App } from '../../state';

type Props = {};

const mapOptions = {
    center: [0, 0],
    minZoom: -2,
    maxZoom: 18,
    zoom: 0,
    zoomDelta: 0.5,
    doubleClickZoom: false,
    preferCanvas: false,
    zoomControl: false,
    crs: L.CRS.Simple
};

const mapStyle = {
    height: '100vh'
};

@observer
export default class StarMap extends Component {

	map: Object;

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.map = L.map('map-container', mapOptions);
		this.map.on('moveend', () => App.setCurrentBounds(this.map.getBounds(), this.map.getZoom()));
		App.setStarMap(this.map);
		this.forceUpdate();
	}

	/*componentDidUpdate() {
		this.systemsLayer.clearLayers();
		if(App.currentZoom >= 2) {
			const systems = toJS(Universe.systems, false);
			systems.forEach(system => {
				if(system.x && system.y) {
					const coords = L.latLng([system.y, system.x]);
					if(App.currentBounds.contains(coords)) {

						const marker = L.circleMarker(coords, {
							radius: 4,
							fillColor: system.color,
							color: system.color
						});

						marker.bindTooltip(system.name);
						this.systemsLayer.addLayer(marker);
					}
				}
			});
		}

		this.areasLayer.clearLayers();
		Universe.polygons.forEach(sphere => {
			L.polygon(sphere.sphere.map(point => L.latLng([point[1], point[0]])), {color: sphere.properties.color}).addTo(this.areasLayer);
		});

		

	}*/

	componentWillUnmount() {
        this.map.remove();
    }

	render() {

		const map = App.starMap;

		const layers = this.map
			? <div><SystemsLayer /><SpheresLayer /></div>
			: null;

		return(
			<div style={ mapStyle } id='map-container'>{ layers }</div>
		);
	}

}