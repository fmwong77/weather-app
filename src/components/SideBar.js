import React, { Component } from 'react';

const URL = 'http://localhost:3000/api/v1/locations';

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		fetch(URL)
			.then((response) => response.json())
			.then((locations) => console.log(locations));
	};

	render() {
		return (
			<form>
				<select name="location" id="location">
					<option value="All">Current</option>
					<option value="Assault">Assault</option>
					<option value="Defender">Defender</option>
					<option value="Support">Support</option>
				</select>
				<button type="submit" className="ui secondary button">
					Filter
				</button>
			</form>
		);
	}
}

export default SideBar;
