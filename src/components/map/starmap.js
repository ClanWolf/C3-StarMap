/* @flow */
import React, { Component } from 'react';
import L from 'leaflet';
import SimpleGraticule from './simplegraticule';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { SystemsLayer, SpheresLayer, RouteLayer } from './';
import { Universe, App } from '../../state';


type Props = {};

const mapOptions = {
    center: [210, 4],
    minZoom: -2,
    maxZoom: 15,
    zoom: 1,
    zoomDelta: 0.2,
    doubleClickZoom: false,
    preferCanvas: false,
    zoomControl: false,
    crs: L.CRS.Simple,
    maxBounds: [[-3000, -3000], [3000, 3000]],
    renderer: L.svg({ padding: 100 })
};

const mapStyle = {
    height: '100vh'
};

const options = {
	interval: 200,
    showshowOriginLabel: false,
    redraw: 'move'
};
 
const simpleGraticule = new SimpleGraticule(options);

@observer
export default class StarMap extends Component {

	map: Object;

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.map = L.map('map-container', mapOptions);
		this.map.on('moveend', () => App.setCurrentBounds(this.map.getBounds(), this.map.getZoom()));
		simpleGraticule.addTo(this.map);

		App.setStarMap(this.map);
	}

	componentDidUpdate() {
		
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