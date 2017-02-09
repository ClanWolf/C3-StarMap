/* @flow */
import { observable, computed, action, toJS } from 'mobx';
import systems from './systems.json';
import factions from './factions.json';
import { voronoi as d3voronoi } from 'd3-voronoi';

const voronoi = d3voronoi().x(d => d.x).y(d => d.y);

class Universe {

	factions: Map<string, Fraction> = new Map();

	constructor() {
		factions.forEach(faction => this.factions.set(faction.name, faction));
	}

	@computed
	get systems(): Array<System> {
		return systems
			.filter(system => system.x && system.y)
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

}

export default new Universe();