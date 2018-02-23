/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StarMap } from './map';
import { Universe } from '../state';

type Props = {};

@observer
export default class RootComponent extends Component {

	constructor(props: Props) {
		super(props);
		this.state = {
			loaded: false
		}
	}

	componentWillMount() {
		Universe.loadData().then(() => {
			this.setState({ loaded: true })
		});
	}

	render() {
		if (this.state.loaded === true) {
			return(
				<div style={{ color: 'white' }}>
					<StarMap />
				</div>
			);
		}
		return null
	}
}
