import React, { Component } from 'react';
import Nav from './components/Nav';
import WeatherDashBoard from './components/WeatherDashBoard';
import ChangeUnit from './components/ChangeUnit';
import FavouriteLocation from './components/FavouriteLocation';
import SideBar from './components/SideBar';
import ReactDOM from 'react-dom';
import WeatherContextProvider from './contexts/WeatherContext';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div className="App">
				{/* <AuthContextProvider> */}
				<WeatherContextProvider>
					<Nav />
					<div className="ui vertical labeled icon ui overlay left thin visible sidebar menu">
						<SideBar />
					</div>
					<div>
						<FavouriteLocation />
					</div>
					<div className="mt-lg-5">
						<div className="col-lg-6 p-0 mx-auto">
							<WeatherDashBoard />
						</div>
					</div>
				</WeatherContextProvider>
				{/* </AuthContextProvider> */}
			</div>
		);
	}
}

export default App;
