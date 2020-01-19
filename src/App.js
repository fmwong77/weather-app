import React from 'react';
import Nav from './components/Nav';
import WeatherDashBoard from './components/WeatherDashBoard';
import './App.css';

function App() {
	return (
		<div className="App">
			<Nav />
			<div className="mt-lg-5">
				<div className="col-lg-6 p-0 mx-auto">
					<WeatherDashBoard />
				</div>
			</div>
		</div>
	);
}

export default App;
