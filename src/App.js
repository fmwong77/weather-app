import React, { Component } from 'react';

import Nav from './components/Nav';
import WeatherDashBoard from './components/WeatherDashBoard';
import SignUp from './components/SignUp';
import CreateNotification from './components/CreateNotification';
import FavouriteLocation from './components/FavouriteLocation';
import Setting from './components/Setting';
import Authenticate from './components/Authenticate';
import SignOut from './components/SignOut';
import SideBar from './components/SideBar';

import WeatherContextProvider from './contexts/WeatherContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
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
								<Route exact path="/setting" component={Setting}></Route>
								<Route exact path="/signin" component={Authenticate}></Route>
								<Route exact path="/signout" component={SignOut}></Route>
								<SideBar />

								<WeatherDashBoard />
							</div>
						</div>
					</WeatherContextProvider>
				</div>
			</Router>
		);
	}
}

export default App;
