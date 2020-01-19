import React from 'react';

const Header = (props) => (
	<nav
		className="header navbar navbar-dark bg-dark"
		style={{ overflowX: 'hidden' }}
	>
		<div className="container">
			<div className="brand">
				<i className="brand-icon fa fa-sun-o fa-2x"></i>
				<span className="brand-text"></span>
			</div>
		</div>
	</nav>
);

export default Header;
