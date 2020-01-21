import React, { Component } from 'react';

import Nav from './components/Nav';
import WeatherDashBoard from './components/WeatherDashBoard';
import SignUp from './components/SignUp';
import CreateNotification from './components/CreateNotification';
import FavouriteLocation from './components/FavouriteLocation';
import SideBar from './components/SideBar';

import { combineContexts } from 'react-combine-contexts';
import WeatherContextProvider from './contexts/WeatherContext';
import UserContextProvider from './contexts/UserContext';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<UserContextProvider>
						<WeatherContextProvider>
							<Nav />
							<div className="mt-lg-5">
								<div className="col-lg-6 p-0 mx-auto">
									<Route exact path="/"></Route>
									<Route exact path="/signup" component={SignUp}></Route>
									<Route
										exact
										path="/location"
										component={FavouriteLocation}
									></Route>
									<Route
										exact
										path="/notification"
										component={CreateNotification}
									></Route>
									<div className="ui vertical labeled icon ui overlay left thin visible sidebar menu">
										<SideBar />
									</div>
									<WeatherDashBoard />
								</div>
							</div>
						</WeatherContextProvider>
					</UserContextProvider>
				</div>
			</Router>
		);
	}
}

export default App;
