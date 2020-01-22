import React from 'react';
import PropTypes from 'prop-types';

const HourlyWeatherForecastCard = ({ forecast }) => (
	<div className="hourly-weather-card">
		<small>{forecast.date}</small>
		<br></br>
		{/* <img className="icon mx-auto" src={forecast.icon} />
		<div className="font-weight-bold">
			{parseInt(forecast.temperature.current)}&deg; &nbsp;
			<small>{parseInt(forecast.temperature.feels_like)}&deg;</small>
		</div>
		<div className="text-capitalize">
			<small>{forecast.condition}</small>
		</div> */}
	</div>
);

HourlyWeatherForecastCard.propTypes = {
	forecast: PropTypes.object.isRequired
};

export default HourlyWeatherForecastCard;
