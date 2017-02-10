/* @flow */
import React, { Component } from 'react';
import L from 'leaflet';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Universe, App } from '../../state';

type Props = {};

@observer
export default class SystemsLayer extends Component {

	layer: Object;

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.layer = L.geoJSON(null, {}).addTo(App.starMap);
	}

	componentDidUpdate() {
		this.layer.clearLayers();
		if(App.currentZoom >= 2) {
			const systems = toJS(Universe.systems, false);
			systems.forEach(system => {
				const coords = L.latLng([system.y, system.x]);
				if(App.currentBounds.contains(coords)) {

					const marker = L.circleMarker(coords, {
						radius: 8,
						fillColor: 'white',
						color: system.color,
						fillOpacity: 0.5
					});

					marker.on({
						click: () => Universe.addStop(system)
					});

					if(App.currentZoom >= 4) {
						const icon = L.divIcon({ 
							html: system.name,
							iconSize: [160, 10],
							iconAnchor: [80, 30],
							className: 'system-label'
						});
						L.marker(coords, { icon: icon }).addTo(this.layer);
					} else {
						marker.bindTooltip(system.name);
					}

					this.layer.addLayer(marker);
				}
			});
		}

	}

	componentWillUnmount() {
        App.starMap.removeLayer(this.layer);
    }

	render() {

		const systems = Universe.systems;
		const bounds = App.currentBounds;
		const zoom = App.currentZoom;

		return null;
	}

}