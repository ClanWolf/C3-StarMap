/* @flow */
import React, { Component } from 'react';
import L from 'leaflet';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { SystemsLayer, SpheresLayer, RouteLayer } from './';
import { Universe, App } from '../../state';

type Props = {};

const mapOptions = {
    center: [0, 0],
    minZoom: -2,
    maxZoom: 18,
    zoom: -1,
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
	}

	componentWillUnmount() {
        this.map.remove();
    }

	render() {

		const map = App.starMap;

		const layers = this.map
			? 	<div>
					<SystemsLayer />
					<SpheresLayer />
					<RouteLayer />
				</div>
			: 	null;

		return(
			<div style={ mapStyle } id='map-container'>{ layers }</div>
		);
	}

}