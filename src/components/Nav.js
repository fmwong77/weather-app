import React, { Component } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link } from 'react-router-dom';

class Header extends Component {
	static contextType = WeatherContext;

	signOut = () => {
		this.context.toggleAuthentication(false);
		this.context.setUserId(null);
		this.context.setLocationAdded();
	};

	render() {
		const { isAuthenticated } = this.context;
		return (
			<nav
				className="header navbar navbar-dark bg-dark"
				style={{ overflowX: 'hidden' }}
			>
				<div className="container">
					{isAuthenticated ? (
						<div className="brand">
							<Link to="/">
								<i className="brand-icon fa fa-sun-o fa-2x"></i>
								<span className="brand-text">Weather</span>
							</Link>
							<Link to="/">
								<span onClick={this.signOut}>
									<i className="brand-function-icon fa fa-sign-out"></i>
								</span>
							</Link>
							<Link to="/location">
								<span>
									<i className="brand-function-icon fa fa-map-marker fa-2x"></i>
								</span>
							</Link>
							<Link to="/setting">
								<span>
									<i className="brand-function-icon fa fa-cogs fa-2x"></i>
								</span>
							</Link>
							<Link to="/signup">
								<span>
									<i className="brand-function-icon fa fa-user-plus fa-2x"></i>
								</span>
							</Link>
							<Link to="/notification">
								<span>
									<i className="brand-function-icon fa fa-bell fa-2x"></i>
								</span>
							</Link>
						</div>
					) : (
						<div className="brand">
							<Link to="/">
								<i className="brand-icon fa fa-sun-o fa-2x"></i>
								<span className="brand-text">Weather</span>
							</Link>
							<Link to="/signin">
								<span>
									<i className="brand-function-icon fa fa-sign-in"></i>
								</span>
							</Link>
							<Link to="/setting">
								<span>
									<i className="brand-function-icon fa fa-cogs fa-2x"></i>
								</span>
							</Link>
							<Link to="/signup">
								<span>
									<i className="brand-function-icon fa fa-user-plus fa-2x"></i>
								</span>
							</Link>
							<Link to="/notification">
								<span>
									<i className="brand-function-icon fa fa-bell fa-2x"></i>
								</span>
							</Link>
						</div>
					)}
				</div>
			</nav>
		);
	}
}

export default Header;
