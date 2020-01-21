import React, { Component } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Header extends Component {
	static contextType = WeatherContext;

	render() {
		console.log(this.context);
		const { unit, toggleUnit } = this.context;
		return (
			<nav
				className="header navbar navbar-dark bg-dark"
				style={{ overflowX: 'hidden' }}
			>
				<div className="container">
					<div className="brand">
						<i className="brand-icon fa fa-sun-o fa-2x"></i>
						<span className="brand-text"></span>
						<span className="unit" onClick={toggleUnit}>
							°{unit}
						</span>
						<span className="unit">Sign Up</span>
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;
