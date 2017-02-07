/* @flow */
import { observable, computed, action, toJS } from 'mobx';
import planets from './planets.json';
import { voronoi as d3voronoi } from 'd3-voronoi';

const voronoi = d3voronoi().x(d => d.x).y(d => d.y);

class Universe {

	@observable 
	planets: Array<Planet> = [];

	constructor() {
		this.planets = planets.filter(planet => planet.x && planet.y);
	}

	@computed
	get polygons(): Array<PolygonCoordinates> {
		voronoi.extent([[-3000,-3000], [3000, 3000]]);
		const voronoiPolygons = voronoi(toJS(this.planets,false)).polygons();
		return voronoiPolygons.map(coordinates => {
			//const data = coordinates.data;
			coordinates.push([ ...coordinates[0]])
			coordinates = coordinates.slice();
			return coordinates;
		});
	}

}

export default new Universe();