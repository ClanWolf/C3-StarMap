/* @flow */
import { observable, computed, action, toJS } from 'mobx';

class App {
	
	@observable currentZoom: number = 0;
	@observable currentBounds: Object = {};
	@observable starMap: Object;

	@action setCurrentBounds = (bounds: Object, zoom: number) => {
		this.currentZoom = zoom;
		this.currentBounds = bounds;
	}

	@action setStarMap = (starMap: Object) => this.starMap = starMap;
}

export default new App();