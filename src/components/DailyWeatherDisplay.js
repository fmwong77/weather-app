import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DailyWeatherForecastCard from './DailyWeatherForecastCard';
import Slider from 'infinite-react-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

const options = {
	items: 1,
	nav: false,
	rewind: true,
	autoplay: false
};

const settings = {
	slidesPerRow: 4
};
class DailyWeatherDisplay extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="daily-weather-display">
				<div className="text-center h5 pt-2">Daily</div>
				<div className="carousel">
					<Slider ref={(el) => el} {...settings}>
						{this.props.dailyForecasts.map((fc, i) => (
							<DailyWeatherForecastCard forecast={fc} key={i} />
						))}
					</Slider>
				</div>
			</div>
		);
	}
}

DailyWeatherDisplay.propTypes = {
	dailyForecasts: PropTypes.array.isRequired
};

export default DailyWeatherDisplay;
