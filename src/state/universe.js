/* @flow */
import { observable, computed, action, toJS } from 'mobx';
import systems from './systems.json';
import factions from './factions.json';
import { voronoi as d3voronoi } from 'd3-voronoi';
import Graph from 'node-dijkstra';

const voronoi = d3voronoi().x(d => d.x).y(d => d.y);

class Universe {

	factions: Map<string, Faction> = new Map();
	route = new Graph();

	@observable
	path: Array<System> = [];

	@observable
	systemProperties: Map<string, System> = observable.map({});

	constructor() {
		factions.forEach(faction => this.factions.set(faction.name, faction));
		systems
			.map((system, key) => Object.assign({}, system, { id: `${key}` }))
			.filter(system => system.x && system.y)
			.forEach(system => this.systemProperties.set(system.id, system));

		Array.from(this.systemProperties.values()).forEach(system => {
			var nodes = {};
			system.neighbors.forEach(neighbor => nodes[`${neighbor}`] = 1);
			if(Object.keys(nodes).length)
				this.route.addNode(system.id, nodes);
		});

		console.log(this.route.path('0', '200'));
	}

	@computed
	get systems(): Array<System> {
		return Array.from(this.systemProperties.values())
			.map(system => {
				const faction = this.factions.get(system.affiliation);
				return Object.assign({}, system, { color: faction ? faction.color : '#111111' });
			});
	}

	@computed
	get spheres(): Array<SystemSphere> {
		voronoi.extent([[-3000,-3000], [3000, 3000]]);
		const voronoiPolygons = voronoi(toJS(this.systems, false)).polygons();
		return voronoiPolygons.map(coordinates => {
			const properties = coordinates.data;
			coordinates.push([ ...coordinates[0]])
			coordinates = coordinates.slice();
			return {
				sphere: coordinates,
				properties: properties
			};
		});
	}

	@action
	addStop = (system: System) => {
		const path = toJS(this.path, false);
		if(path.length === 0) {
			path.push(system);
		} else {
			const stops = this.route.path(path[path.length - 1].id, system.id);
			stops
				.slice(1)
				.map(stop =>  this.systemProperties.get(stop))
				.forEach(system => path.push(system));
		}
		this.path = path;

	};

}

export default new Universe();