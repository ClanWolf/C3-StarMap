/* @flow */
import { observable, computed, action, toJS } from 'mobx';
import systems from './systems.json';
import factions from './factions.json';

import { voronoi as d3voronoi } from 'd3-voronoi';
import Graph from 'node-dijkstra';

import concaveman from 'concaveman';
import greinerHormann from 'greiner-hormann';
import Offset from 'polygon-offset';

const voronoi = d3voronoi().x(d => d.x).y(d => d.y);
const route = new Graph();
const offset = new Offset();

class Universe {

	@observable
	factions: Map<string, Faction> = observable.map({});

	@observable
	path: Array<System> = [];

	@observable
	systemProperties: Map<string, System> = observable.map({});

	constructor() {
		factions.forEach(faction => this.factions.set(faction.name, faction));
		systems
			.map((system, key) => Object.assign({}, system, { id: `${key}` }))
			.filter(system => system.x != null && system.y != null)
			.filter(system => {
				const faction = this.factions.get(system.affiliation);
				return faction && faction.world
			})
			.forEach(system => this.systemProperties.set(system.id, system));

		Array.from(this.systemProperties.values()).forEach(system => {
			var nodes = {};
			system.neighbors.forEach(neighbor => nodes[`${neighbor}`] = 1);
			if(Object.keys(nodes).length)
				route.addNode(system.id, nodes);
		});
	}

	@computed
	get factionMapping(): Map<string, Array<System>> {
		const mapping = observable.map({});
		this.systems.forEach(system => {
			(mapping[system.affiliation] = mapping[system.affiliation] || []).push(system);
		});
		return mapping;
	}

	@computed
	get systems(): Array<System> {
		return Array.from(this.systemProperties.values())
			.map(system => {
				const faction = this.factions.get(system.affiliation);
				return Object.assign({}, system, { color: faction ? faction.color : '#ffffff' });
			});
	}

	@computed
	get spheres(): Array<SystemSphere> {
		const hulls: Map<string, PolygonCoordinates> = new Map();
		const mapping = {};
		this.systems.forEach(system => {
			if(system.x && system.y)  // filter Terra
				(mapping[system.affiliation] = mapping[system.affiliation] || []).push(system);
		});

		Object.keys(mapping).forEach(id => {
				hulls.set(id, offset.data(concaveman(mapping[id].map(system => [ system.x, system.y ]), 1.5)).offsetLine(20)[0]);
		});

		voronoi.extent([[-3000,-3000], [3000, 3000]]);
		const systems = toJS(this.systems, false);
		const voronoiPolygons = voronoi(systems).polygons();
		return voronoiPolygons.map(coordinates => {
			const properties = coordinates.data;
			const polygon = coordinates.slice();
			if(properties.x && properties.y) {
				let intersection = greinerHormann.intersection(hulls.get(properties.affiliation), polygon);
				if(intersection) {
				    intersection = intersection[0];
						return {
							sphere: intersection,
							properties: properties
						};
				}
			} else {
				// Terra
				return {
					sphere: polygon,
					properties: properties
				};
			}
		});
	}

	@action
	addStop = (system: System) => {
		const path = toJS(this.path, false);
		if(path.length === 0) {
			path.push(system);
		} else {
			const stops = route.path(path[path.length - 1].id, system.id);
			if(stops)
				stops
					.slice(1)
					.map(stop =>  this.systemProperties.get(stop))
					.forEach(system => path.push(system));
		}
		this.path = path;

	};

}

export default new Universe();
