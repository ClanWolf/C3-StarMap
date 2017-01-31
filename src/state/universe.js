/* @flow */
import { observable, computed, action } from 'mobx';
import planets from './planets.json';

class Universe {

	@observable 
	planets: Array<Planet> = [];

	constructor() {
		this.planets = planets;
	}

}

export default new Universe();