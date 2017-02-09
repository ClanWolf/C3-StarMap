/* @flow */
import React, { Component } from 'react';
import L from 'leaflet';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Universe, App } from '../../state';

type Props = {};

@observer
export default class RouteLayer extends Component {

	layer: Object;

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.layer = L.geoJSON(null, {}).addTo(App.starMap);
	}

	componentDidUpdate() {
		this.layer.clearLayers();
		const stops = toJS(Universe.path, false);
		stops.forEach(system => {
			const coords = L.latLng([system.y, system.x]);
			const marker = L.circleMarker(coords, {
				radius: 16,
				color: 'white',
				fillOpacity: 0,
				weight: 5
			});

			this.layer.addLayer(marker);
		});

		this.layer.addLayer(L.polyline(stops.map(stop => L.latLng([stop.y, stop.x])), {
			color: 'white',
			dashArray: '10,5'
		}));

	}

	componentWillUnmount() {
        App.starMap.removeLayer(this.layer);
    }

	render() {
		const path = Universe.path;
		return null;
	}

}