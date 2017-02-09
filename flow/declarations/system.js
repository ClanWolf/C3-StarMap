/* @flow */
declare type System = {
	id: string,
    link: string,
    name: string,
    x: number,
    y: number,
    affiliation: string,
    neighbors: Array<number>,
    color: string
};

declare type SystemSphere = {
	properties: System,
	sphere: PolygonCoordinates
}