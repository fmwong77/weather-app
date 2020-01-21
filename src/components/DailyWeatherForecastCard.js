import React from 'react';
import PropTypes from 'prop-types';

const weekday = new Array(7);
weekday[0] = 'Sun';
weekday[1] = 'Mon';
weekday[2] = 'Tue';
weekday[3] = 'Wed';
weekday[4] = 'Thu';
weekday[5] = 'Fri';
weekday[6] = 'Sat';

const getDate = (date) => {
	let parts = date.split('-');
	// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
	// January - 0, February - 1, etc.
	let mydate = new Date(parts[0], parts[1] - 1, parts[2]);
	return `${weekday[mydate.getDay()]} ${mydate.getDate()}`;
};

const DailyWeatherForecastCard = ({ forecast }) => (
	<div className="daily-weather-card">
		<small>{getDate(forecast.date)}</small>
		<br></br>
		<img className="icon mx-auto" src={forecast.icon} />
		<div className="font-weight-bold">
			{parseInt(forecast.temperature.max_temp)}&deg; &nbsp;
			<small>{parseInt(forecast.temperature.min_temp)}&deg;</small>
		</div>
		<div className="text-capitalize">
			<small>{forecast.condition}</small>
		</div>
	</div>
);

DailyWeatherForecastCard.propTypes = {
	forecast: PropTypes.object.isRequired
};

export default DailyWeatherForecastCard;
