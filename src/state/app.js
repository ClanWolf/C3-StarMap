/* @flow */
import { observable, computed, action, toJS } from 'mobx';

class App {
	
	@observable currentZoom: number = 0;
	@observable currentBounds: Object = {};
	@observable leafletMap: Object;

	@action setCurrentBounds = (bounds: Object, zoom: number) => {
		this.currentZoom = zoom;
		this.currentBounds = bounds;
	}

	@action setStarMap = (starMap: Object) => this.leafletMap = starMap;
	
	@computed
	get starMap() {
		return this.leafletMap;
	}
}

const instance = new App();
window.StarMap = instance;
export default instance;