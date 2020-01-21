import React, { Component } from 'react';
import Map from './Map';

class FavouriteLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div style={{ margin: '100px' }}>
				<Map
					google={this.props.google}
					center={{ lat: 30.26715, lng: -97.74306 }}
					height="300px"
					zoom={15}
				/>
			</div>
		);
	}
}

export default FavouriteLocation;
