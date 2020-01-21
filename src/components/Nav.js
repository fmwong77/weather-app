import React, { Component } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

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
						<Link to="/">
							<i className="brand-icon fa fa-sun-o fa-2x"></i>
						</Link>
						<span className="brand-text"></span>
						<span className="unit" onClick={toggleUnit}>
							°{unit}
						</span>
						<Link to="/signup">
							<span className="unit">
								<i className="brand-icon fa fa-user-plus"></i>
							</span>
						</Link>
						<Link to="/location">
							<span className="unit">
								<i className="brand-icon fa fa-map-marker"></i>
							</span>
						</Link>
						<Link to="/notification">
							<span className="unit">
								<i className="brand-icon fa fa-bell"></i>
							</span>
						</Link>
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;
