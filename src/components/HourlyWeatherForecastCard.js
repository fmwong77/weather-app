import React from 'react';
import PropTypes from 'prop-types';

// const timeFormat = (time) => {
// 	if (utcHour > 12) {
// 		hour = utcHour - 12;
// 		hour = hour + 'pm';
// 	} else {
// 		if (utcHour === 12) {
// 			hour = utcHour + 'pm';
// 		} else {
// 			if (utcHour === 0) {
// 				utcHour = 12;
// 			}
// 			hour = utcHour + 'am';
// 		}
// 	}
// }

function tConvert(time) {
	// Check correct time format and split into components
	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
		time
	];

	if (time.length > 1) {
		// If time format correct
		time = time.slice(1); // Remove full string match value
		time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join(''); // return adjusted time or original string
}

const HourlyWeatherForecastCard = ({ forecast }) => (
	<div className="hourly-weather-card">
		<small>{tConvert(forecast.time.substring(0, 5))}</small>
		{/* <br></br>
		<small>{forecast.timestamp_local}</small> */}
		<br></br>
		<img
			className="icon mx-auto"
			src={forecast.icon}
			alt={forecast.condition}
		/>
		<div className="font-weight-bold">
			{parseInt(forecast.temperature.current)}&deg; &nbsp;
			<small>{parseInt(forecast.temperature.feels_like)}&deg;</small>
		</div>
		<div className="text-capitalize">
			<small>{forecast.condition}</small>
		</div>
	</div>
);

HourlyWeatherForecastCard.propTypes = {
	forecast: PropTypes.object.isRequired
};

export default HourlyWeatherForecastCard;
