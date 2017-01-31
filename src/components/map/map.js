/* @flow */
import React, { Component } from 'react';
import L from 'leaflet';

type Props = {};

const mapOptions = {
    center: [0, 0],
    //minZoom: 6,
    maxZoom: 18,
    zoom: 13,
    doubleClickZoom: false,
    preferCanvas: false,
    zoomControl: false,
    crs: L.CRS.Simple
};

const mapStyle = {
    height: '100vh'
};

export default class MapComponent extends Component {

	map: Object;

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.map = L.map('map-container', mapOptions);
		this.forceUpdate();
	}

	componentWillUnmount() {
        this.map.remove();
    }

	render() {
		return(
			<div style={ mapStyle } id='map-container'></div>
		);
	}

}