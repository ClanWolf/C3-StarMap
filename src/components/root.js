/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StarMap } from './map';

type Props = {};

@observer
export default class RootComponent extends Component {

	constructor(props: Props) {
		super(props);
	} 

	render() {
		return(
			<div style={{ color: 'white' }}>
				<StarMap />
			</div>
		);
	}
}
