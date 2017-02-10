/* @flow */
import React, { Component } from 'react';
import L from 'leaflet';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Universe, App } from '../../state';

type Props = {};

@observer
export default class SpheresLayer extends Component {

	layer: Object;

	constructor(props: Props) {
		super(props);
	}

	refresh = () => {
		Universe.spheres.forEach(system => {
			const options = {
				color: system.properties.color,
				stroke: true,
				fillOpacity: 0.4,
				opacity: 0.4,
				weight: 2
			};
			L.polygon(system.sphere.map(point => L.latLng([point[1], point[0]])), options).addTo(this.layer);
		});
	}

	componentDidMount() {
		this.layer = L.geoJSON(null, {}).addTo(App.starMap);
		this.refresh();
	}

	componentDidUpdate() {
		this.layer.clearLayers();
		this.refresh();
	}

	componentWillUnmount() {
        App.starMap.removeLayer(this.layer);
    }

	render() {

		const spheres = Universe.spheres;

		return null;
	}

}