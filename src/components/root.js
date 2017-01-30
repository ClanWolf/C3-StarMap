/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';

type Props = {};

@observer
export default class Root extends Component {

	constructor(props: Props) {
		super(props);
	} 

	render() {
		return(
			<div style={{ color: 'white' }}>Test</div>
		);
	}
}
